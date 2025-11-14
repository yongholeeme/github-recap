import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export async function fetchCountOfMyCreatedPrs(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfMyMergedPrs(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:merged merged:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsReviewedByMe(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `reviewed-by:${username} type:pr created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfParticipatedPrs(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Search for issues where user is involved (author, commenter, or mentioned)
  const query = `involves:${username} type:pr created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsApprovedByMe(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // This is an approximation - exact count requires individual PR review checks
  const query = `reviewed-by:${username} type:pr review:approved created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsRequestedChangeByMe(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // This is an approximation
  const query = `reviewed-by:${username} type:pr review:changes_requested created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfCommentsByMeToPr(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `commenter:${username} type:pr updated:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfMyClosedPrsNotMerged(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:closed is:unmerged closed:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return data.total_count || 0;
}

interface PRDetail {
  title: string;
  url: string;
  number: number;
  repo: string;
  comments: number;
  createdAt: string;
  mergedAt?: string | null;
  closedAt?: string | null;
}

interface PRGraphQLResponse {
  search: {
    nodes: Array<{
      title: string;
      url: string;
      number: number;
      createdAt: string;
      mergedAt?: string | null;
      closedAt?: string | null;
      comments: {
        totalCount: number;
      };
      reviews: {
        totalCount: number;
      };
      reviewThreads: {
        totalCount: number;
      };
      repository: {
        nameWithOwner: string;
      };
    } | null>;
  };
}

export async function fetchMostDiscussedPR(
  year: number = new Date().getFullYear()
): Promise<PRDetail | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    // Use GraphQL to get accurate comment counts
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: ISSUE, first: 100) {
          nodes {
            ... on PullRequest {
              title
              url
              number
              createdAt
              mergedAt
              closedAt
              comments {
                totalCount
              }
              reviews {
                totalCount
              }
              reviewThreads {
                totalCount
              }
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    `;

    const searchQuery = `involves:${username} type:pr created:${startDate}..${endDate}`;
    const response = await octokit.graphql<PRGraphQLResponse>(query, {
      searchQuery,
    });

    let mostDiscussedPR: PRDetail | null = null;
    let maxComments = -1;

    for (const pr of response.search.nodes) {
      if (!pr) continue;

      // Total = comments + reviews + review threads (each thread can have multiple comments)
      const totalComments =
        pr.comments.totalCount +
        pr.reviews.totalCount +
        pr.reviewThreads.totalCount;

      if (totalComments > maxComments) {
        maxComments = totalComments;
        mostDiscussedPR = {
          title: pr.title,
          url: pr.url,
          number: pr.number,
          repo: pr.repository.nameWithOwner,
          comments: totalComments,
          createdAt: pr.createdAt,
          mergedAt: pr.mergedAt,
          closedAt: pr.closedAt,
        };
      }
    }

    return mostDiscussedPR;
  } catch (error) {
    console.error("Error fetching most discussed PR:", error);
    return null;
  }
}

export async function fetchMyAverageMergeTime(
  year: number = new Date().getFullYear()
): Promise<number | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:merged merged:${startDate}..${endDate}`;

  const allPRs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      per_page: 100,
      page,
    });

    allPRs.push(...data.items);
    hasMore = data.items.length === 100;
    page++;
  }

  if (allPRs.length === 0) return null;

  let totalHours = 0;
  let validCount = 0;

  for (const pr of allPRs) {
    if (pr.pull_request?.merged_at && pr.created_at) {
      const created = new Date(pr.created_at);
      const merged = new Date(pr.pull_request.merged_at);
      const hours = (merged.getTime() - created.getTime()) / (1000 * 60 * 60);
      totalHours += hours;
      validCount++;
    }
  }

  return validCount > 0 ? totalHours / validCount : null;
}

export async function fetchMyFastestMergedPR(
  year: number = new Date().getFullYear()
): Promise<PRDetail | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:merged merged:${startDate}..${endDate}`;

  const allPRs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      per_page: 100,
      page,
    });

    allPRs.push(...data.items);
    hasMore = data.items.length === 100;
    page++;
  }

  if (allPRs.length === 0) return null;

  let fastest = null;
  let minHours = Infinity;

  for (const pr of allPRs) {
    if (pr.pull_request?.merged_at && pr.created_at) {
      const created = new Date(pr.created_at);
      const merged = new Date(pr.pull_request.merged_at);
      const hours = (merged.getTime() - created.getTime()) / (1000 * 60 * 60);

      if (hours < minHours) {
        minHours = hours;
        fastest = {
          title: pr.title,
          url: pr.html_url,
          number: pr.number,
          repo: pr.repository_url.split("/").slice(-2).join("/"),
          comments: pr.comments,
          createdAt: pr.created_at,
          mergedAt: pr.pull_request.merged_at,
          closedAt: pr.closed_at,
        };
      }
    }
  }

  return fastest;
}

export async function fetchMySlowestMergedPR(
  year: number = new Date().getFullYear()
): Promise<PRDetail | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:pr is:merged merged:${startDate}..${endDate}`;

  const allPRs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      per_page: 100,
      page,
    });

    allPRs.push(...data.items);
    hasMore = data.items.length === 100;
    page++;
  }

  if (allPRs.length === 0) return null;

  let slowest = null;
  let maxHours = -1;

  for (const pr of allPRs) {
    if (pr.pull_request?.merged_at && pr.created_at) {
      const created = new Date(pr.created_at);
      const merged = new Date(pr.pull_request.merged_at);
      const hours = (merged.getTime() - created.getTime()) / (1000 * 60 * 60);

      if (hours > maxHours) {
        maxHours = hours;
        slowest = {
          title: pr.title,
          url: pr.html_url,
          number: pr.number,
          repo: pr.repository_url.split("/").slice(-2).join("/"),
          comments: pr.comments,
          createdAt: pr.created_at,
          mergedAt: pr.pull_request.merged_at,
          closedAt: pr.closed_at,
        };
      }
    }
  }

  return slowest;
}
