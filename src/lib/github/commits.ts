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
