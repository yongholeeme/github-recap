import { getOctokit, getUsername } from "@/lib/github/auth";
import { fetcher, getDateRange, getMonthDateRange } from "@/lib/github/utils";

export async function fetchCountOfIssueComments(year: number): Promise<number> {
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const data = await fetcher<{ total_count: number }>({
    pathname: "/search/issues",
    q: `commenter:${username} type:issue updated:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfParticipatedIssues(
  year: number
): Promise<number> {
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const data = await fetcher<{ total_count: number }>({
    pathname: "/search/issues",
    q: `involves:${username} type:issue created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export async function fetchCountOfMentionsMe(year: number): Promise<number> {
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const data = await fetcher<{ total_count: number }>({
    pathname: "/search/issues",
    q: `mentions:${username} created:${startDate}..${endDate}`,
    per_page: 1,
  });

  return data.total_count || 0;
}

export interface MentionDetail {
  username: string;
  count: number;
}

export async function fetchMentionsByMonth(
  year: number,
  month: number,
  page = 1
): Promise<(string | null)[]> {
  const username = await getUsername();
  const { startDate, endDate } = getMonthDateRange(year, month);

  const data = await fetcher<{
    items: Array<{ user?: { login: string } | null }>;
    total_count: number;
  }>({
    pathname: "/search/issues",
    q: `mentions:${username} created:${startDate}..${endDate}`,
    per_page: 100,
    page,
  });

  const items = data.items.map((item) => item.user?.login ?? null);
  const totalCount = data.total_count;
  const maxPages = Math.min(Math.ceil(totalCount / 100), 10); // Max 1000 items (10 pages)

  // Recursively fetch next page if available
  if (page < maxPages) {
    const nextPageItems = await fetchMentionsByMonth(year, month, page + 1);
    return [...items, ...nextPageItems];
  }

  return items;
}

// GitHub Discussions APIs (using GraphQL)
interface DiscussionCountResponse {
  search: {
    discussionCount: number;
  };
}

interface DiscussionCommentsResponse {
  search: {
    nodes: Array<{
      comments?: {
        nodes: Array<{
          author: {
            login: string;
          } | null;
          createdAt: string;
        }>;
      };
    }>;
  };
}

export async function fetchCountOfDiscussionComments(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    // Get all discussions the user commented on
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 100) {
          nodes {
            ... on Discussion {
              comments(first: 100) {
                nodes {
                  author {
                    login
                  }
                  createdAt
                }
              }
            }
          }
        }
      }
    `;

    const searchQuery = `commenter:${username} created:${startDate}..${endDate}`;
    const response = await octokit.graphql<DiscussionCommentsResponse>(query, {
      searchQuery,
    });

    let totalComments = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (const discussion of response.search.nodes || []) {
      if (discussion?.comments?.nodes) {
        for (const comment of discussion.comments.nodes) {
          if (comment.author?.login === username) {
            const commentDate = new Date(comment.createdAt);
            if (commentDate >= start && commentDate <= end) {
              totalComments++;
            }
          }
        }
      }
    }

    return totalComments;
  } catch (error) {
    console.error("Error fetching discussion comments count:", error);
    return 0;
  }
}

export async function fetchCountOfParticipatedDiscussions(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    // Get discussions where user is involved (author or commenter)
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 1) {
          discussionCount
        }
      }
    `;

    const searchQuery = `involves:${username} created:${startDate}..${endDate}`;
    const response = await octokit.graphql<DiscussionCountResponse>(query, {
      searchQuery,
    });

    return response.search.discussionCount || 0;
  } catch (error) {
    console.error("Error fetching participated discussions count:", error);
    return 0;
  }
}

interface IssueDetail {
  title: string;
  url: string;
  number: number;
  repo: string;
  comments: number;
  createdAt: string;
  closedAt?: string | null;
}

export async function fetchMostDiscussedIssue(
  year: number
): Promise<IssueDetail | null> {
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const data = await fetcher<{
    items: Array<{
      title: string;
      html_url: string;
      number: number;
      repository_url: string;
      comments: number;
      created_at: string;
      closed_at?: string | null;
    }>;
  }>({
    pathname: "/search/issues",
    q: `involves:${username} type:issue created:${startDate}..${endDate}`,
    per_page: 100,
    sort: "comments",
    order: "desc",
  });

  if (data.items.length === 0) return null;

  const issue = data.items[0];
  return {
    title: issue.title,
    url: issue.html_url,
    number: issue.number,
    repo: issue.repository_url.split("/").slice(-2).join("/"),
    comments: issue.comments,
    createdAt: issue.created_at,
    closedAt: issue.closed_at,
  };
}

export async function fetchMostDiscussedDiscussion(
  year: number
): Promise<IssueDetail | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    // Limit: 50 discussions × 50 comments × 100 replies = 250,000 nodes (within 500k limit)
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 50) {
          nodes {
            ... on Discussion {
              title
              url
              createdAt
              repository {
                nameWithOwner
              }
              comments(first: 50) {
                totalCount
                nodes {
                  replies(first: 100) {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Use involves: to get discussions the user participated in (author or commenter)
    // Note: GraphQL search doesn't support sort parameter, need to fetch multiple and sort manually
    const searchQuery = `involves:${username} created:${startDate}..${endDate}`;
    const response = await octokit.graphql<{
      search: {
        nodes: Array<{
          title: string;
          url: string;
          createdAt: string;
          repository: { nameWithOwner: string };
          comments: {
            totalCount: number;
            nodes: Array<{
              replies: {
                totalCount: number;
              };
            }>;
          };
        } | null>;
      };
    }>(query, {
      searchQuery,
    });

    if (!response.search.nodes || response.search.nodes.length === 0)
      return null;

    // Calculate total comments (comments + all replies) for each discussion and find the most discussed one
    let mostDiscussed: IssueDetail | null = null;
    let maxComments = -1;

    for (const discussion of response.search.nodes) {
      if (!discussion) continue;

      // Total = direct comments + all replies
      const totalReplies = discussion.comments.nodes.reduce(
        (sum, comment) => sum + comment.replies.totalCount,
        0
      );
      const totalComments = discussion.comments.totalCount + totalReplies;

      if (totalComments > maxComments) {
        maxComments = totalComments;
        mostDiscussed = {
          title: discussion.title,
          url: discussion.url,
          number: 0, // Discussions don't have numbers in the same way
          repo: discussion.repository.nameWithOwner,
          comments: totalComments,
          createdAt: discussion.createdAt,
        };
      }
    }

    return mostDiscussed;
  } catch (error) {
    console.error("Error fetching most discussed discussion:", error);
    return null;
  }
}
