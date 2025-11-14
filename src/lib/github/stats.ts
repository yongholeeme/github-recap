import { getCommitsCount } from "@/lib/github/commits";
import { getIssuesCount } from "@/lib/github/issues";
import {
  getPullRequestsCount,
  getPullRequestReviewsCount,
} from "@/lib/github/pullRequests";

export async function getLastYearStats(
  year: number = new Date().getFullYear()
): Promise<{
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
}> {
  const lastYear = year - 1;

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
