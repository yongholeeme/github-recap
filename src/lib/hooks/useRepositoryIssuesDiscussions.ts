import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getUsername } from "@/lib/github/auth";
import { fetcher, getDateRange } from "@/lib/github/utils";

interface RepositoryIssueDiscussionStats {
  repo: string;
  issueCount: number;
  discussionCount: number;
  totalCount: number;
}

export function useRepositoryIssuesDiscussions(year: number) {
  return useQuery({
    queryKey: queryKeys.useRepositoryIssuesDiscussions(year),
    queryFn: async () => {
      const username = await getUsername();
      const { startDate, endDate } = getDateRange(year);

      // Fetch all issues the user participated in
      const issuesData = await fetcher<{
        items: Array<{
          repository_url: string;
        }>;
      }>({
        pathname: "/search/issues",
        q: `involves:${username} type:issue created:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
      });

      // Count issues per repository
      const repoMap = new Map<
        string,
        RepositoryIssueDiscussionStats & { username: string }
      >();

      for (const issue of issuesData.items) {
        const [owner, repo] = issue.repository_url.split("/").slice(-2);
        const repoFullName = `${owner}/${repo}`;

        if (repoMap.has(repoFullName)) {
          repoMap.get(repoFullName)!.issueCount++;
          repoMap.get(repoFullName)!.totalCount++;
        } else {
          repoMap.set(repoFullName, {
            repo: repoFullName,
            username,
            issueCount: 1,
            discussionCount: 0,
            totalCount: 1,
          });
        }
      }

      // Note: GitHub REST API doesn't support searching discussions
      // We would need GraphQL for discussions, but for now we'll show only issues
      // or we can use the existing GraphQL queries if available

      // Sort by total count descending
      return Array.from(repoMap.values()).sort(
        (a, b) => b.totalCount - a.totalCount
      );
    },
    staleTime: 1000 * 60 * 5,
  });
}
