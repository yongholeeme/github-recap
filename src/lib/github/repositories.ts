import { Octokit } from "octokit";
import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export type RepoData = Awaited<
  ReturnType<Octokit["rest"]["repos"]["listForAuthenticatedUser"]>
>["data"];

export async function getAllRepositoriesData(): Promise<RepoData> {
  const octokit = await getOctokit();

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: "updated",
  });

  return repos;
}

export async function getCreatedReposCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `user:${username} created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.repos({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getContributedReposCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Get PRs to other repos
  const query = `author:${username} type:pr created:${startDate}..${endDate} -user:${username}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  // Count unique repositories
  const uniqueRepos = new Set(data.items.map((item) => item.repository_url));

  return uniqueRepos.size;
}

export function calculateTopLanguages(
  repos: RepoData,
  year: number = new Date().getFullYear()
): Array<{ language: string; count: number; percentage: number }> {
  // Filter repos by creation or update date in the year
  const { startDate, endDate } = getDateRange(year);
  const filteredRepos = repos.filter((repo) => {
    if (!repo.updated_at) return false;
    const updatedAt = new Date(repo.updated_at);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return updatedAt >= start && updatedAt <= end;
  });

  const languageCounts: Record<string, number> = {};
  let totalCount = 0;

  for (const repo of filteredRepos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalCount++;
    }
  }

  const sortedLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / totalCount) * 100),
    }));

  return sortedLanguages;
}

export async function getTopLanguages(
  year: number = new Date().getFullYear()
): Promise<Array<{ language: string; count: number; percentage: number }>> {
  const repos = await getAllRepositoriesData();
  return calculateTopLanguages(repos, year);
}
