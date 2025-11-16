import { getUsername } from "@/lib/github/auth";
import { fetcher, getDateRange, getMonthDateRange } from "@/lib/github/utils";

export interface SimplifiedCommit {
  message: string; // !
  committedDate: string; // !
  url: string;
}

export async function fetchCommitsByMonth(
  year: number,
  month: number,
  page = 1
): Promise<SimplifiedCommit[]> {
  const username = await getUsername();
  const { startDate, endDate } = getMonthDateRange(Number(year), Number(month));

  const data = await fetcher<{
    items: Array<{
      commit: { message: string; author?: { date: string } };
      html_url: string;
    }>;
    total_count: number;
  }>({
    pathname: "/search/commits",
    q: `author:${username} committer-date:${startDate}..${endDate}`,
    per_page: 100,
    page,
  });

  const commits: SimplifiedCommit[] = data.items.map((item) => ({
    message: item.commit.message,
    committedDate: item.commit.author?.date || "",
    url: item.html_url,
  }));

  const totalCount = data.total_count;
  const maxPages = Math.min(Math.ceil(totalCount / 100), 10); // Max 1000 commits (10 pages)

  if (page < maxPages) {
    const nextPageCommits = await fetchCommitsByMonth(year, month, page + 1);
    return [...commits, ...nextPageCommits];
  }

  return commits;
}

export async function fetchCountOfCommits(year: number): Promise<number> {
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const data = await fetcher<{ total_count: number }>({
    pathname: "/search/commits",
    q: `author:${username} committer-date:${startDate}..${endDate}`,
    per_page: 1,
    page: 1,
  });

  return data.total_count || 0;
}
