import { getAllRepositoriesData } from "@/lib/github";
import { queryKeys } from "@/lib/queryKeys";
import { useInViewQuery } from "@/lib/hooks/useInViewQuery";

/**
 * 모든 레포지토리 관련 컴포넌트가 공유하는 레포 데이터
 * React Query 캐싱으로 중복 요청 방지
 */
export function useRepositoriesData() {
  return useInViewQuery({
    queryKey: queryKeys.repositories.all(),
    queryFn: () => getAllRepositoriesData(),
  });
}
