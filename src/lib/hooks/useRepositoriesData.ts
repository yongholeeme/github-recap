import { getAllRepositoriesData } from '@/lib/github/repositories';;
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

/**
 * 모든 레포지토리 관련 컴포넌트가 공유하는 레포지토리 데이터
 * React Query 캐싱으로 중복 요청 방지
 */
export function useRepositoriesData() {
  return useQuery({
    queryKey: queryKeys.repositories.all(),
    queryFn: getAllRepositoriesData,
  });
}
