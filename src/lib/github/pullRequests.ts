import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange, getMonthDateRange } from "@/lib/github/utils";

export async function fetchCountOfMyCreatedPrs(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `author:${username} type:pr created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfMyMergedPrs(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsReviewedByMe(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `reviewed-by:${username} type:pr created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfParticipatedPrs(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `involves:${username} type:pr created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsApprovedByMe(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `reviewed-by:${username} type:pr review:approved created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfPrsRequestedChangeByMe(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `reviewed-by:${username} type:pr review:changes_requested created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfCommentsByMeToPr(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `commenter:${username} type:pr updated:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfMyClosedPrsNotMerged(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `author:${username} type:pr is:closed is:unmerged closed:${startDate}..${endDate}`,
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
  year: number
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

interface Pr {
  title: string
  url: string
  createdAt: string
  mergedAt?: string | null
  closedAt: string | null
}

export async function fetchMyMergedPRs(year: number, month: number, page = 1): Promise<Pr[]> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getMonthDateRange(year, month);

  const {data} = await octokit.rest.search.issuesAndPullRequests({
    q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
    per_page: 100,
    page,
  });

  const prs = data.items.map((item) => ({
    title: item.title,
    url: item.html_url,
    createdAt: item.created_at,
    mergedAt: item.pull_request?.merged_at,
    closedAt: item.closed_at,
  }))

  const totalCount = data.total_count;
  const maxPages = Math.min(Math.ceil(totalCount / 100), 10); // Max 1000 commits (10 pages)

  if (page < maxPages) {
    const nextPagePrs = await fetchMyMergedPRs(year, month, page + 1);
    return [...prs, ...nextPagePrs];
  }

  return prs;
}