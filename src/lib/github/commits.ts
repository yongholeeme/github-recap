import { Octokit } from "octokit";
import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export type CommitData = Awaited<
  ReturnType<Octokit["rest"]["search"]["commits"]>
>["data"]["items"];

export async function getAllCommitsData(
  year: number = new Date().getFullYear()
): Promise<CommitData> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  return data.items;
}

export async function getCommitsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}
