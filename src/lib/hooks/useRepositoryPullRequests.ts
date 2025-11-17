import { useQuery } from "@tanstack/react-query";
import {
  fetchMyMergedPRs,
  type RepositoryPRStats,
} from "@/lib/github/pullRequests";
import { getUsername } from "@/lib/github/auth";
import { queryKeys } from "@/lib/queryKeys";

export function useRepositoryPullRequests(year: number) {
  return useQuery({
    queryKey: queryKeys.useRepositoryPullRequests(year),
    queryFn: async () => {
      const username = await getUsername();

      // Count PRs per repository
      const repoMap = new Map<
        string,
        RepositoryPRStats & { username: string }
      >();

      // Fetch PRs for all 12 months
      for (let month = 1; month <= 12; month++) {
        const prs = await fetchMyMergedPRs(year, month);

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
              username,
              prCount: 1,
            });
          }
        }
      }

      // Sort by PR count descending
      return Array.from(repoMap.values()).sort((a, b) => b.prCount - a.prCount);
    },
    staleTime: 1000 * 60 * 5,
  });
}
