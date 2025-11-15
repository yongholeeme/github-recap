import { fetchMentionsByMonth } from '@/lib/github/issues';
import { queryKeys } from "@/lib/queryKeys";
import { useQueries } from "@tanstack/react-query";

export function usePeopleToMentionMe(year: number, limit = 10) {
  const queries = useQueries({
    queries: Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
      queryKey: queryKeys.usePeopleToMentionMe(year, month),
      queryFn: () => fetchMentionsByMonth(year, month),
    })),
  });

  const allMentions = queries.flatMap((query) => query.data ?? []);
  const isFetching = queries.some((query) => query.isFetching);

  // Count mentions by the issue/PR author
  const mentionDetails = (() => {
    if (allMentions.length === 0) return [];

    const mentionCounts = new Map<string, number>();

    for (const item of allMentions) {
      const author = item.user?.login;
      if (author) {
        mentionCounts.set(author, (mentionCounts.get(author) || 0) + 1);
      }
    }

    // Sort and return top mentions
    return Array.from(mentionCounts.entries())
      .map(([username, count]) => ({ username, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  })();

  return {
    data: mentionDetails,
    isFetching,
  };
}
