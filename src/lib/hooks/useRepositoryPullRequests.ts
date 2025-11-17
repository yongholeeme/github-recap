import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  fetchMyMergedPRs,
  type RepositoryPRStats,
} from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";

export function useRepositoryPullRequests(year: number) {
  const user = useUser();

  const monthQueries = useQueries({
    queries: Array.from({ length: 12 }, (_, i) => ({
      queryKey: [...queryKeys.useRepositoryPullRequests(year), i + 1],
      queryFn: () => fetchMyMergedPRs(year, i + 1),
    })),
  });

  const isFetching = monthQueries.some((r) => r.isFetching);
  const isError = monthQueries.some((r) => r.isError);
  const error = monthQueries.find((r) => r.error)?.error;

  const data = useMemo(() => {
    if (isFetching || !user) {
      return undefined;
    }

    // Count PRs per repository
    const repoMap = new Map<
      string,
      RepositoryPRStats & { username: string }
    >();

    for (const result of monthQueries) {
      const prs = result.data ?? [];

      for (const pr of prs) {
        // Extract repository info from PR URL
        // URL format: https://github.com/{owner}/{repo}/pull/{number}
        const urlParts = pr.url.split("/");
        const owner = urlParts[3];
        const repo = urlParts[4];
        const repoFullName = `${owner}/${repo}`;

        if (repoMap.has(repoFullName)) {
          repoMap.get(repoFullName)!.prCount++;
        } else {
          repoMap.set(repoFullName, {
            repo: repoFullName,
            username: user.user_name,
            prCount: 1,
          });
        }
      }
    }

    // Sort by PR count descending
    return Array.from(repoMap.values()).sort((a, b) => b.prCount - a.prCount);
  }, [isFetching, user, monthQueries]);

  return {
    data,
    isFetching,
    isError,
    error,
  };
}
