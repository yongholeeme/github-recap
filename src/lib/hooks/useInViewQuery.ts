import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

/**
 * InView 기반 쿼리 훅 - 뷰포트에 들어올 때만 실행
 * Lazy loading을 위한 React Query + Intersection Observer 통합
 */
export function useInViewQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    queryKey: TQueryKey;
    queryFn: () => Promise<TQueryFnData>;
  }
) {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번만 트리거
    threshold: 0.1, // 10% 보이면 트리거
    rootMargin: "500px", // 뷰포트 500px 전에 미리 로드
  });

  const query = useQuery({
    ...options,
    enabled: inView && (options.enabled !== undefined ? options.enabled : true),
  });

  return { ...query, ref };
}
