import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export async function getPullRequestsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getMergedPullRequestsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:merged merged:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getPullRequestReviewsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `reviewed-by:${username} type:pr created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getApprovedPullRequestsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // This is an approximation - exact count requires individual PR review checks
  const query = `reviewed-by:${username} type:pr review:approved created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getRequestedChangesPullRequestsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // This is an approximation
  const query = `reviewed-by:${username} type:pr review:changes_requested created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getPullRequestReviewCommentsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `commenter:${username} type:pr updated:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}
