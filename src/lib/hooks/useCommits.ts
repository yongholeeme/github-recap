import { fetchCommitsByMonth } from '@/lib/github/commits';
import { queryKeys } from "@/lib/queryKeys";
import { useQueries } from "@tanstack/react-query";

export function useCommits(year: number) {
  const queries = useQueries({
    queries: Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
      queryKey: queryKeys.commits.byMonth(year, month),
      queryFn: () => fetchCommitsByMonth(year, month),
    })),
  });

  return {
    data: queries.flatMap((query) => query.data ?? []),
    isFetching: queries.some((query) => query.isFetching),
  }
}
