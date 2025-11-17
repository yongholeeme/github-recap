import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useUser } from "@/contexts/UserContext";
import { fetchInvolvedIssues } from "@/lib/github/issues";

interface RepositoryIssueDiscussionStats {
  repo: string;
  issueCount: number;
  discussionCount: number;
  totalCount: number;
}

export function useRepositoryIssuesDiscussions(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useRepositoryIssuesDiscussions(year),
    queryFn: async () => {
      if (!user) {
        return [];
      }

      // Fetch all issues the user participated in
      const issues = await fetchInvolvedIssues(user.user_name, year);

      // Count issues per repository
      const repoMap = new Map<
        string,
        RepositoryIssueDiscussionStats & { username: string }
      >();

      for (const issue of issues) {
        const [owner, repo] = issue.repository_url.split("/").slice(-2);
        const repoFullName = `${owner}/${repo}`;

        if (repoMap.has(repoFullName)) {
          repoMap.get(repoFullName)!.issueCount++;
          repoMap.get(repoFullName)!.totalCount++;
        } else {
          repoMap.set(repoFullName, {
            repo: repoFullName,
            username: user.user_name,
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
