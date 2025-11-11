import { getAllCommitsData } from '@/lib/github/commits';;
import { queryKeys } from "@/lib/queryKeys";
import { useInViewQuery } from "@/lib/hooks/useInViewQuery";

/**
 * 모든 커밋 관련 컴포넌트가 공유하는 커밋 데이터
 * React Query 캐싱으로 중복 요청 방지
 */
export function useCommitsData(year: number = new Date().getFullYear()) {
  return useInViewQuery({
    queryKey: queryKeys.commits.data(year),
    queryFn: () => getAllCommitsData(year),
  });
}
