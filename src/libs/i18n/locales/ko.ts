export default {
    // Common
    common: {
        error: '오류 발생',
        refreshFailed: '새로고침 실패',
        clickToView: '클릭하여 보기',
        noData: '데이터가 없습니다',
        noDataDescription: '활동을 시작하면 여기에 표시됩니다',
        activityRatio: '내 활동 비중',
        loading: '데이터 로딩 중...',
        refresh: '최신화',
        refreshAll: '전체 데이터 최신화',
        more: '더보기',
        times: '{{count}}회',
        items: '{{count}}개',
        comments: '{{count}}개의 댓글',
    },

    // Auth
    auth: {
        login: '로그인',
        logout: '로그아웃',
        loginWithGitHub: 'GitHub로 시작하기',
        loginWithToken: '토큰으로 시작하기',
        privacyNotice: '모든 데이터는 브라우저에서만 처리되며',
        privacyNotice2: '서버에 저장되지 않습니다',
        patLogin: {
            title: '로그인',
            description: 'Personal Access Token으로',
            description2: '올해의 활동을 확인하세요',
            createToken: '토큰 생성하기',
            requiredScopes: '(필요한 권한: repo, read:user)',
            continue: '계속하기',
            checking: '확인 중...',
            invalidToken: '유효하지 않은 토큰입니다',
            enterToken: '토큰을 입력해주세요',
        },
        oauthLogin: {
            title: '로그인',
            description: 'GitHub 계정으로',
            description2: '올해의 활동을 확인하세요',
            loginButton: 'GitHub로 로그인',
            loggingIn: '로그인 중...',
            failed: 'OAuth 로그인에 실패했습니다',
        },
    },

    // Routes
    routes: {
        invalidYear: '유효하지 않은 연도입니다',
        goHome: '홈으로 돌아가기',
    },

    // Intro Section
    intro: {
        scrollHint: '스크롤 또는 방향키로 확인하기',
    },

    // Outro Section
    outro: {
        yearLabel: '{{year}}년',
        thankYou: '수고하셨습니다',
        message1: '한 줄의 코드, 하나의 커밋이 모여',
        message2: '멋진 한 해를 만들어냈습니다',
        message3: '내년에는 더 멋진 이야기를 함께 써내려가요!',
    },

    // Commit Section
    commit: {
        activity: {
            title: '{{year}}년 작성한 커밋',
            subtitle: '한 줄 한 줄 쌓아올린 당신의 기록',
        },
        byHour: {
            title: '24시간의 흔적',
            subtitle: '하루 중 언제 가장 몰입하시나요?',
            hour: '{{hour}}시',
            maxCommits: '최다 커밋',
            avgCommits: '평균 커밋',
        },
        byDay: {
            title: '7일의 패턴',
            subtitle: '일주일 동안 어떤 리듬으로 작업하셨나요?',
            days: {
                0: '일',
                1: '월',
                2: '화',
                3: '수',
                4: '목',
                5: '금',
                6: '토',
            },
            dayFormat: '{{day}}요일',
            weekdayCommits: '평일 커밋',
            weekendCommits: '주말 커밋',
        },
        timeline: {
            title: '12개월의 여정',
            subtitle: '한 해 동안 당신의 개발 스토리',
            month: '{{month}}월',
            activeMonths: '활동 개월',
            avgPerMonth: '월평균 커밋',
            bestRecord: '최고 기록',
        },
        repository: {
            title: '{{year}}년의 코드들이 모인 곳',
            countLabel: '커밋',
        },
    },

    // PR Section
    pr: {
        contributed: {
            title: '기여한 Pull Request',
            subtitle: '참여한 PR의 개수',
        },
        activity: {
            title: '함께 만드는',
            title2: '더 나은 코드',
            subtitle: 'Pull Request로 협업하고 성장합니다',
        },
        cards: {
            created: {
                title: '생성한 PR',
                description: '작성한 풀 리퀘스트',
            },
            merged: {
                title: '머지된 PR',
                description: '병합 완료',
            },
            closed: {
                title: '닫힌 PR',
                description: '머지되지 않음',
            },
            approved: {
                title: '승인한 PR',
            },
            requestedChanges: {
                title: '변경 요청',
            },
            reviews: {
                title: 'PR 리뷰',
                description: '리뷰한 PR',
            },
            reviewComments: {
                title: '리뷰 댓글',
                description: '코드 리뷰 댓글',
            },
            mostDiscussed: {
                title: '가장 치열했던 PR',
                description: '코멘트 수 기준',
            },
            fastestMerged: {
                title: '가장 빨리 머지된 PR',
                description: '머지 속도',
            },
            slowestMerged: {
                title: '머지까지 가장 오래 걸린 PR',
                description: '머지 속도',
            },
            avgMergeTime: {
                title: 'PR 평균 머지 속도',
                description: '생성부터 머지까지',
            },
        },
    },

    // Issue Section
    issue: {
        contributed: {
            title: '참여한 이슈와 디스커션',
            subtitle: '당신의 목소리가 닿은 곳',
        },
        activity: {
            title: '문제를 찾고',
            title2: '해결합니다',
            subtitle: '이슈와 토론으로 함께 성장하는 커뮤니티',
        },
        repository: {
            title: '저장소별 이슈 참여도',
            subtitle: '가장 많이 참여한 이슈가 있는 저장소들',
            countLabel: '이슈',
        },
        cards: {
            participatedIssues: {
                title: '참여한 이슈',
                description: '작성 + 코멘트',
            },
            issueComments: {
                title: '이슈 코멘트',
                description: '코멘트',
            },
            participatedDiscussions: {
                title: '참여한 디스커션',
                description: '작성 + 코멘트',
            },
            discussionComments: {
                title: '디스커션 코멘트',
                description: '코멘트',
            },
            mostDiscussedIssue: {
                title: '가장 치열했던 이슈',
                description: '코멘트 수 기준',
            },
            mostDiscussedDiscussion: {
                title: '가장 치열했던 디스커션',
                description: '코멘트 수 기준',
            },
        },
    },

    // Mention Section
    mention: {
        count: {
            title: '{{year}}년 멘션 받은 횟수',
            subtitle: '당신을 향한 관심',
        },
        topMentionedBy: {
            title: '누가 나를 가장 많이 멘션했나요?',
            subtitle: 'TOP 10 멘션러',
        },
    },

    // Growth Section
    growth: {
        title: '작년과 비교해볼까요?',
        subtitle: '같은 기간, 숫자로 보는 변화',
        metrics: {
            commits: '커밋',
            createdPR: '생성한 Pull Request',
            reviewedPR: '리뷰한 Pull Request',
            issues: '이슈 & 디스커션',
        },
        year: '{{year}}년',
        change: '변화량',
    },

    // Time formats
    time: {
        seconds: '{{count}}초',
        minutes: '{{count}}분',
        hours: '{{count}}시간',
        days: '{{count}}일',
        daysAndHours: '{{days}}일 {{hours}}시간',
    },
}
