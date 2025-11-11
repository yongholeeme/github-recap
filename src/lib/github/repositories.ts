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
