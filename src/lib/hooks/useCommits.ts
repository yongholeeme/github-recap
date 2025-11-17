import { fetchCommitsByMonth } from "@/lib/github/commits";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQueries } from "@tanstack/react-query";

export function useCommits(year: number) {
  const user = useUser();

  const queries = useQueries({
    queries: Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
      queryKey: queryKeys.useCommits(year, month),
      queryFn: () => fetchCommitsByMonth(year, month),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!user,
    })),
  });

  return {
    data: queries.flatMap((query) => query.data ?? []),
    isFetching: queries.some((query) => query.isFetching),
  };
}
