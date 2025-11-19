# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 가이드를 제공합니다.

## 프로젝트 개요

GitHub Recap은 사용자의 GitHub 활동 요약을 생성하는 React 기반 웹 애플리케이션입니다. 사용자가 GitHub Personal Access Token (PAT)으로 인증하면, 앱이 지정된 연도의 활동 데이터를 가져와서 커밋, PR, 이슈, 디스커션 등에 대한 인사이트를 표시합니다.

## 개발 명령어

### 필수 명령어

- `pnpm dev` - HMR이 포함된 Vite 개발 서버 시작
- `pnpm build` - `tsc -b`로 타입 체크 후 Vite로 프로덕션 빌드
- `pnpm lint` - 코드베이스에 ESLint 실행
- `pnpm preview` - 프로덕션 빌드 로컬 미리보기
- `pnpm knip` - 사용하지 않는 파일, 의존성, export 검출

### 패키지 매니저

- 이 프로젝트는 **pnpm**을 사용하며 `packageManager` 필드를 통해 특정 버전이 강제됩니다
- Node 버전 요구사항: `>=22.12.0`
- 표준 Vite 대신 `rolldown-vite` 사용 (pnpm overrides로 설정)

## 아키텍처

### 기술 스택

- **React 19.2** with React Compiler 활성화 (`babel-plugin-react-compiler` 사용)
- **TanStack Router** - 파일 기반 라우팅, 자동 코드 스플리팅
- **TanStack Query** - 영구 캐싱이 있는 데이터 페칭 (24시간 stale/gc time)
- **Vite** (rolldown-vite) - 빌드 도구
- **Tailwind CSS 4** - 스타일링
- **Octokit** - GitHub API 상호작용
- **date-fns** - 날짜 조작

### 라우팅 구조

`src/routes/`에 파일 기반 라우트:

- `__root.tsx` - 루트 레이아웃 (최소한의 Outlet 래퍼)
- `index.tsx` - 홈 라우트, 현재 연도의 요약 표시
- `$year.tsx` - 동적 연도 라우트, 유효성 검사 포함 (2008-2030)
- 라우트 트리는 TanStack Router 플러그인에 의해 `src/routeTree.gen.ts`에 자동 생성됨

### 상태 관리

#### Context Providers

- **UserContext** (`src/contexts/UserContext.tsx`): `useUser()` 훅을 통해 인증된 사용자 데이터 제공
- **YearContext** (`src/contexts/YearContext.tsx`): 요약을 위한 선택된 연도 관리

#### 데이터 페칭 전략

모든 GitHub API 호출은 적극적인 캐싱과 함께 TanStack Query 사용:

- 쿼리 키는 `src/lib/queryKeys.ts`에 중앙화됨
- 24시간 stale time 및 garbage collection time
- localStorage에 영구 캐시 저장 (키: `REACT_QUERY_CACHE_STORAGE_KEY`)
- window focus, reconnect, mount 시 refetch 하지 않음
- 인증 토큰은 sessionStorage에 저장 (키: `PAT_STORAGE_KEY`)

### GitHub API 통합

#### 인증

- `src/lib/github/auth.ts`: Octokit 초기화 및 사용자명 캐싱 처리
- 모든 API 호출에 sessionStorage의 GitHub PAT 사용
- `getUsername()`은 인증된 사용자의 로그인을 캐싱하여 API 호출 최소화

#### 데이터 페처

`src/lib/github/`에 위치:

- `commits.ts` - 커밋 데이터 및 카운트 가져오기
- `pullRequests.ts` - PR 데이터 가져오기
- `issues.ts` - 이슈 및 디스커션 데이터 가져오기
- `utils.ts` - 자동 페이지네이션 로직이 있는 공유 `fetcher()` 함수

`utils.ts`의 `fetcher()` 함수:

- 검색 API (`/search/*`)와 직접 API 엔드포인트 모두 처리
- `fetchAll: true` 및 `per_page: 100`일 때 자동 페이지네이션
- 결과가 100개 미만이 반환될 때까지 재귀적으로 모든 페이지 가져오기
- GitHub API v2022-11-28 사용

#### 커스텀 훅 패턴

`src/lib/hooks/`에 위치:

- 모든 데이터 페칭 훅은 `use[Feature]` 네이밍을 따름 (예: `useCommits`, `useCountOfCommits`)
- 대부분의 훅은 `year` 매개변수를 받고 `queryKeys.ts`의 쿼리 키를 사용
- 월별 데이터가 필요한 훅은 `useQueries`를 사용하여 12개월 모두 병렬로 가져옴
- 모든 훅은 `enabled: !!user`를 확인하여 인증되지 않았을 때 페칭 방지

### 컴포넌트 아키텍처

#### 섹션 컴포넌트

`src/components/`에 위치한 대형 기능 섹션:

- `[Feature]Section.tsx` 패턴을 따름 (예: `CommitActivitySection`, `PullRequestActivitySection`)
- 각 섹션은 일반적으로 관련 데이터를 가져오기 위해 여러 커스텀 훅 사용
- 섹션은 자체 로딩 상태 처리

#### 통계 카드 컴포넌트

`src/components/stats/`의 세분화된 통계 카드:

- 개별 메트릭용 재사용 가능한 카드 (예: `MergedPullRequestsCard`, `FastestMergedPRCard`)
- 각 카드는 일반적으로 하나의 특정 훅 사용

#### 유틸리티

- `CountUpAnimation.tsx` - 애니메이션 숫자 카운터 컴포넌트
- `StatCard.tsx` - 통계 표시를 위한 기본 카드 컴포넌트
- `charts/BarChart.tsx` - 차트 시각화 컴포넌트

### 설정

#### 경로 별칭

- `@/`는 `./src`로 매핑됨 (`vite.config.ts`에서 설정)

#### 중요한 설정 파일

- `config.ts` (루트) - GitHub API URL 설정
- `src/constants/storage.ts` - localStorage/sessionStorage 키 상수

### React Compiler

React Compiler가 활성화되어 컴포넌트 리렌더링을 자동으로 최적화합니다. 이는 Vite 개발 및 빌드 성능에 영향을 줍니다. 대부분의 경우 수동으로 `useMemo`, `useCallback`, `React.memo`를 사용할 필요가 없습니다.

## 개발 워크플로우

### GitHub API 작업

1. 모든 API 상호작용은 `src/lib/github/utils.ts`의 `fetcher()` 유틸리티를 사용해야 함
2. 새로운 데이터 타입의 경우, 적절한 파일 (`commits.ts`, `pullRequests.ts`, `issues.ts`)에 페처 함수 생성
3. TanStack Query를 사용하는 커스텀 훅을 `src/lib/hooks/`에 생성
4. `src/lib/queryKeys.ts`에 쿼리 키 추가
5. 컴포넌트에서 훅 사용

### 새 라우트 추가

1. TanStack Router 규칙에 따라 `src/routes/`에 파일 생성
2. `@tanstack/router-plugin`을 통해 `routeTree.gen.ts`가 자동 업데이트됨
3. 라우트 파일은 `createFileRoute()`로 생성된 `Route`를 export 해야 함

### 변경사항 테스트

- 개발 시 HMR과 함께 `pnpm dev` 사용
- 커밋 전 `pnpm knip`으로 사용하지 않는 코드 확인
- `pnpm lint`가 통과하는지 확인
- `pnpm build`가 성공하는지 확인 (타입 체크 포함)
