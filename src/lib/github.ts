import { Octokit } from "octokit";
import { supabase } from "./supabase";

let cachedUsername: string | null = null;

async function getOctokit(): Promise<Octokit> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session:", session);
  console.log("Provider token:", session?.provider_token);

  const token = session?.provider_token;
  if (!token) {
    throw new Error("GitHub 액세스 토큰이 없습니다. 다시 로그인해주세요.");
  }

  return new Octokit({ auth: token });
}

async function getUsername(): Promise<string> {
  if (cachedUsername) {
    return cachedUsername;
  }

  const octokit = await getOctokit();
  const { data: user } = await octokit.rest.users.getAuthenticated();
  cachedUsername = user.login;
  return cachedUsername;
}

function getDateRange(year: number = new Date().getFullYear()) {
  return {
    startDate: `${year}-01-01T00:00:00Z`,
    endDate: `${year}-12-31T23:59:59Z`,
  };
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

export async function getIssuesCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:issue created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getIssueCommentsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `commenter:${username} type:issue updated:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

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

export async function getClosedIssuesCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:issue closed:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
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

export async function getTotalStarsReceived(): Promise<number> {
  const octokit = await getOctokit();

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: "updated",
  });

  return repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
}

export async function getTotalForksReceived(): Promise<number> {
  const octokit = await getOctokit();

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
    sort: "updated",
  });

  return repos.reduce((total, repo) => total + (repo.forks_count || 0), 0);
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

export async function getMentionsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `mentions:${username} created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}

export async function getLongestCommitMessage(
  year: number = new Date().getFullYear()
): Promise<{
  message: string;
  length: number;
  repository: string;
  url: string;
}> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  console.log("getLongestCommitMessage - items count:", data.items.length);

  if (data.items.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let longestCommit = data.items[0];
  for (const item of data.items) {
    if (item.commit.message.length > longestCommit.commit.message.length) {
      longestCommit = item;
    }
  }

  console.log("getLongestCommitMessage - result:", {
    length: longestCommit.commit.message.length,
    repository: longestCommit.repository.full_name,
  });

  return {
    message: longestCommit.commit.message,
    length: longestCommit.commit.message.length,
    repository: longestCommit.repository.full_name,
    url: longestCommit.html_url,
  };
}

export async function getShortestCommitMessage(
  year: number = new Date().getFullYear()
): Promise<{
  message: string;
  length: number;
  repository: string;
  url: string;
}> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  console.log("getShortestCommitMessage - items count:", data.items.length);

  if (data.items.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let shortestCommit = data.items[0];
  for (const item of data.items) {
    if (item.commit.message.length < shortestCommit.commit.message.length) {
      shortestCommit = item;
    }
  }

  console.log("getShortestCommitMessage - result:", {
    length: shortestCommit.commit.message.length,
    repository: shortestCommit.repository.full_name,
  });

  return {
    message: shortestCommit.commit.message,
    length: shortestCommit.commit.message.length,
    repository: shortestCommit.repository.full_name,
    url: shortestCommit.html_url,
  };
}

export async function getAverageCommitMessageLength(
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

  if (data.items.length === 0) return 0;

  let totalLength = 0;
  for (const item of data.items) {
    totalLength += item.commit.message.length;
  }

  return Math.round(totalLength / data.items.length);
}

export async function getLatestCommitHour(
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

  let latestHour = 0;
  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const hour = date.getHours();
    if (hour > latestHour) {
      latestHour = hour;
    }
  }

  return latestHour;
}

export async function getMostActiveHour(
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

  const hourCounts: Record<number, number> = {};
  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  let mostActiveHour = 0;
  let maxCount = 0;
  for (const [hour, count] of Object.entries(hourCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostActiveHour = Number(hour);
    }
  }

  return mostActiveHour;
}

export async function getCommitsByHour(
  year: number = new Date().getFullYear()
): Promise<Array<{ hour: number; count: number }>> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  const hourCounts: Record<number, number> = {};
  // Initialize all hours with 0
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = 0;
  }

  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  return Object.entries(hourCounts).map(([hour, count]) => ({
    hour: Number(hour),
    count,
  }));
}

export async function getCommitsByDayOfWeek(
  year: number = new Date().getFullYear()
): Promise<Array<{ day: string; count: number }>> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} committer-date:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.commits({
    q: query,
    per_page: 100,
  });

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayCounts: Record<number, number> = {};

  // Initialize all days with 0
  for (let i = 0; i < 7; i++) {
    dayCounts[i] = 0;
  }

  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const dayOfWeek = date.getDay();
    dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
  }

  return Object.entries(dayCounts).map(([day, count]) => ({
    day: dayNames[Number(day)],
    count,
  }));
}

export async function getActiveDaysCount(
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

  const uniqueDates = new Set<string>();
  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const dateStr = date.toISOString().split("T")[0];
    uniqueDates.add(dateStr);
  }

  return uniqueDates.size;
}

export async function getLongestStreak(
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

  const dates = new Set<string>();
  for (const item of data.items) {
    const date = new Date(item.commit.author?.date || "");
    const dateStr = date.toISOString().split("T")[0];
    dates.add(dateStr);
  }

  const sortedDates = Array.from(dates).sort();
  let currentStreak = 1;
  let longestStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

export async function getPullRequestDiscussionsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Count PRs where user commented (participated in discussion)
  const query = `commenter:${username} type:pr updated:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  return data.total_count || 0;
}
