import { Octokit } from "octokit";
import { getOctokit } from "@/lib/github/auth";

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
