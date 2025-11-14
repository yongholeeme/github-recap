import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

interface SimplifiedCommit {
  message: string;
  committedDate: string;
  url: string;
  repository: string;
}

export type CommitData = SimplifiedCommit[];

async function fetchCommitsForDateRange(
  octokit: Awaited<ReturnType<typeof getOctokit>>,
  username: string,
  startDate: string,
  endDate: string
): Promise<SimplifiedCommit[]> {
  const searchQuery = `author:${username} committer-date:${startDate}..${endDate}`;

  // First, check total count
  const { data: firstPage } = await octokit.rest.search.commits({
    q: searchQuery,
    per_page: 100,
    page: 1,
  });

  const totalCount = firstPage.total_count;
  const commits: SimplifiedCommit[] = firstPage.items.map((item) => ({
    message: item.commit.message,
    committedDate: item.commit.author?.date || "",
    url: item.html_url,
    repository: item.repository.full_name,
  }));

  // If total > 1000, we need to split the date range
  if (totalCount > 1000) {
    console.warn(
      `⚠️ ${startDate} ~ ${endDate}: ${totalCount}개 커밋 (1000개 제한 초과, 일부만 수집됨)`
    );
  }

  // Fetch remaining pages in parallel (up to 1000 total)
  const maxPages = Math.min(Math.ceil(totalCount / 100), 10);

  if (maxPages > 1) {
    const pagePromises = [];
    for (let page = 2; page <= maxPages; page++) {
      pagePromises.push(
        octokit.rest.search.commits({
          q: searchQuery,
          per_page: 100,
          page,
        })
      );
    }

    const pages = await Promise.all(pagePromises);

    for (const { data } of pages) {
      const pageCommits = data.items.map((item) => ({
        message: item.commit.message,
        committedDate: item.commit.author?.date || "",
        url: item.html_url,
        repository: item.repository.full_name,
      }));

      commits.push(...pageCommits);
    }
  }

  return commits;
}

export async function getAllCommitsData(
  year: number = new Date().getFullYear()
): Promise<CommitData> {
  const octokit = await getOctokit();
  const username = await getUsername();

  // 월별로 병렬 요청 (각 월은 1000개 제한 가능성 있지만, 대부분 케이스는 괜찮음)
  const months = Array.from({ length: 12 }, (_, i) => i);

  const monthPromises = months.map(async (month) => {
    const monthStart = new Date(year, month, 1).toISOString().split("T")[0];
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59)
      .toISOString()
      .split("T")[0];

    return fetchCommitsForDateRange(octokit, username, monthStart, monthEnd);
  });

  const monthlyCommits = await Promise.all(monthPromises);
  const allCommits = monthlyCommits.flat();

  return allCommits;
}

export async function getCommitsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Use GraphQL to get only the commit count
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  const result = await octokit.graphql<{
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
      };
    };
  }>(query, {
    username,
    from: startDate,
    to: endDate,
  });

  return result.user.contributionsCollection.totalCommitContributions || 0;
}
