import { Octokit } from "octokit";
import { supabase } from "@/lib/supabase";

async function getOctokit(): Promise<Octokit> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.provider_token;
  if (!token) {
    throw new Error("GitHub 액세스 토큰이 없습니다. 다시 로그인해주세요.");
  }

  return new Octokit({ auth: token });
}

let cachedUsername: string | null = null;

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

// 통합 레포지토리 데이터 - 한 번의 API 요청으로 모든 레포 관련 데이터 계산
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

// 통합 커밋 데이터 - 한 번의 API 요청으로 모든 커밋 관련 데이터 계산
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

// 클라이언트 측 계산 함수들 (데이터를 매개변수로 받음)
export function calculateLongestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
  repository: string;
  url: string;
} {
  if (commits.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let longestCommit = commits[0];
  for (const item of commits) {
    if (item.commit.message.length > longestCommit.commit.message.length) {
      longestCommit = item;
    }
  }

  return {
    message: longestCommit.commit.message,
    length: longestCommit.commit.message.length,
    repository: longestCommit.repository.full_name,
    url: longestCommit.html_url,
  };
}

// 하위 호환성을 위한 래퍼 함수
export async function getLongestCommitMessage(
  year: number = new Date().getFullYear()
): Promise<{
  message: string;
  length: number;
  repository: string;
  url: string;
}> {
  const commits = await getAllCommitsData(year);
  return calculateLongestCommitMessage(commits);
}

export function calculateShortestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
  repository: string;
  url: string;
} {
  if (commits.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let shortestCommit = commits[0];
  for (const item of commits) {
    if (item.commit.message.length < shortestCommit.commit.message.length) {
      shortestCommit = item;
    }
  }

  return {
    message: shortestCommit.commit.message,
    length: shortestCommit.commit.message.length,
    repository: shortestCommit.repository.full_name,
    url: shortestCommit.html_url,
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
  const commits = await getAllCommitsData(year);
  return calculateShortestCommitMessage(commits);
}

export function calculateAverageCommitMessageLength(
  commits: CommitData
): number {
  if (commits.length === 0) return 0;

  let totalLength = 0;
  for (const item of commits) {
    totalLength += item.commit.message.length;
  }

  return Math.round(totalLength / commits.length);
}

export async function getAverageCommitMessageLength(
  year: number = new Date().getFullYear()
): Promise<number> {
  const commits = await getAllCommitsData(year);
  return calculateAverageCommitMessageLength(commits);
}

export function calculateMostActiveHour(commits: CommitData): number {
  const hourCounts: Record<number, number> = {};
  for (const item of commits) {
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

export async function getMostActiveHour(
  year: number = new Date().getFullYear()
): Promise<number> {
  const commits = await getAllCommitsData(year);
  return calculateMostActiveHour(commits);
}

export function calculateCommitsByHour(
  commits: CommitData
): Array<{ hour: number; count: number }> {
  const hourCounts: Record<number, number> = {};
  // Initialize all hours with 0
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = 0;
  }

  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  return Object.entries(hourCounts).map(([hour, count]) => ({
    hour: Number(hour),
    count,
  }));
}

export async function getCommitsByHour(
  year: number = new Date().getFullYear()
): Promise<Array<{ hour: number; count: number }>> {
  const commits = await getAllCommitsData(year);
  return calculateCommitsByHour(commits);
}

export function calculateCommitsByDayOfWeek(
  commits: CommitData
): Array<{ day: string; count: number }> {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayCounts: Record<number, number> = {};

  // Initialize all days with 0
  for (let i = 0; i < 7; i++) {
    dayCounts[i] = 0;
  }

  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const dayOfWeek = date.getDay();
    dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
  }

  return Object.entries(dayCounts).map(([day, count]) => ({
    day: dayNames[Number(day)],
    count,
  }));
}

export async function getCommitsByDayOfWeek(
  year: number = new Date().getFullYear()
): Promise<Array<{ day: string; count: number }>> {
  const commits = await getAllCommitsData(year);
  return calculateCommitsByDayOfWeek(commits);
}

export function calculateActiveDaysCount(commits: CommitData): number {
  const uniqueDates = new Set<string>();
  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const dateStr = date.toISOString().split("T")[0];
    uniqueDates.add(dateStr);
  }

  return uniqueDates.size;
}

export async function getActiveDaysCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const commits = await getAllCommitsData(year);
  return calculateActiveDaysCount(commits);
}

export function calculateLongestStreak(commits: CommitData): number {
  const dates = new Set<string>();
  for (const item of commits) {
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

export async function getLongestStreak(
  year: number = new Date().getFullYear()
): Promise<number> {
  const commits = await getAllCommitsData(year);
  return calculateLongestStreak(commits);
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

// 야행성 지수: 자정~오전 6시 사이 커밋 비율
export function calculateNightOwlScore(commits: CommitData): number {
  if (commits.length === 0) return 0;

  let nightCommits = 0;
  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const hour = date.getHours();
    // 자정(0시)부터 오전 6시까지
    if (hour >= 0 && hour < 6) {
      nightCommits++;
    }
  }

  return Math.round((nightCommits / commits.length) * 100);
}

export async function getNightOwlScore(
  year: number = new Date().getFullYear()
): Promise<number> {
  const commits = await getAllCommitsData(year);
  return calculateNightOwlScore(commits);
}

// 가장 많이 사용한 언어 Top 5
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

// 전년 대비 성장률 - 작년 데이터만 가져옴 (올해는 캐시 활용)
export async function getLastYearStats(): Promise<{
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
}> {
  const lastYear = new Date().getFullYear() - 1;

  // 작년 데이터만 병렬로 가져오기 (4개 요청)
  const [lastCommits, lastPRs, lastIssues, lastReviews] = await Promise.all([
    getCommitsCount(lastYear),
    getPullRequestsCount(lastYear),
    getIssuesCount(lastYear),
    getPullRequestReviewsCount(lastYear),
  ]);

  return {
    commits: lastCommits,
    prs: lastPRs,
    issues: lastIssues,
    reviews: lastReviews,
  };
}

// 커밋 타임라인 (월별 데이터)
export function calculateCommitTimeline(
  commits: CommitData
): Array<{ month: string; count: number }> {
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const monthCounts: Record<number, number> = {};

  // Initialize all months with 0
  for (let i = 0; i < 12; i++) {
    monthCounts[i] = 0;
  }

  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const month = date.getMonth();
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  }

  return Object.entries(monthCounts).map(([month, count]) => ({
    month: monthNames[Number(month)],
    count,
  }));
}

export async function getCommitTimeline(
  year: number = new Date().getFullYear()
): Promise<Array<{ month: string; count: number }>> {
  const commits = await getAllCommitsData(year);
  return calculateCommitTimeline(commits);
}
