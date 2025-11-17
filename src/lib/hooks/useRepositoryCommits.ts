import { useQuery } from "@tanstack/react-query";
import {
  fetchCommitsByMonth,
  type RepositoryCommitStats,
} from "@/lib/github/commits";
import { getUsername } from "@/lib/github/auth";
import { queryKeys } from "@/lib/queryKeys";

export function useRepositoryCommits(year: number) {
  return useQuery({
    queryKey: queryKeys.useRepositoryCommits(year),
    queryFn: async () => {
      const username = await getUsername();

      // Count commits per repository
      const repoMap = new Map<
        string,
        RepositoryCommitStats & { username: string }
      >();

      // Fetch commits for all 12 months
      for (let month = 1; month <= 12; month++) {
        const commits = await fetchCommitsByMonth(year, month);

        for (const commit of commits) {
          // Extract repository info from commit URL
          // URL format: https://github.com/{owner}/{repo}/commit/{sha}
          const urlParts = commit.url.split("/");
          const owner = urlParts[3];
          const repo = urlParts[4];
          const repoFullName = `${owner}/${repo}`;

          if (repoMap.has(repoFullName)) {
            repoMap.get(repoFullName)!.commitCount++;
          } else {
            repoMap.set(repoFullName, {
              repo: repoFullName,
              owner,
              username,
              commitCount: 1,
            });
          }
        }
      }

      // Sort by commit count descending
      return Array.from(repoMap.values()).sort(
        (a, b) => b.commitCount - a.commitCount
      );
    },
    staleTime: 1000 * 60 * 5,
  });
}
