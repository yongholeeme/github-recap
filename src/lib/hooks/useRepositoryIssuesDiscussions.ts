import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { useUser } from "@/contexts/UserContext";
import { fetchInvolvedIssues, fetchInvolvedDiscussions } from "@/lib/github/issues";

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

      // Fetch both issues and discussions in parallel
      const [issues, discussions] = await Promise.all([
        fetchInvolvedIssues(user.user_name, year),
        fetchInvolvedDiscussions(user.user_name, year),
      ]);

      // Count issues and discussions per repository
      const repoMap = new Map<
        string,
        RepositoryIssueDiscussionStats & { username: string }
      >();

      // Process issues
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

      // Process discussions
      for (const discussion of discussions) {
        const repoFullName = discussion.repository.nameWithOwner;

        if (repoMap.has(repoFullName)) {
          repoMap.get(repoFullName)!.discussionCount++;
          repoMap.get(repoFullName)!.totalCount++;
        } else {
          repoMap.set(repoFullName, {
            repo: repoFullName,
            username: user.user_name,
            issueCount: 0,
            discussionCount: 1,
            totalCount: 1,
          });
        }
      }

      // Sort by total count descending
      return Array.from(repoMap.values()).sort(
        (a, b) => b.totalCount - a.totalCount
      );
    },
    enabled: !!user,
  });
}
