import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export async function fetchCountOfIssueComments(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `commenter:${username} type:issue updated:${startDate}..${endDate}`,
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export async function fetchCountOfParticipatedIssues(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `involves:${username} type:issue created:${startDate}..${endDate}`,
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export async function fetchCountOfMentionsMe(
  year: number
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `mentions:${username} created:${startDate}..${endDate}`,
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export interface MentionDetail {
  username: string;
  count: number;
}

export async function fetchPeopleToMetionMe(
  year: number,
  limit: number = 5
): Promise<MentionDetail[]> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Fetch with pagination
  const allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    // Max 1000 items
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: `mentions:${username} created:${startDate}..${endDate}`,
      per_page: 100,
      page,
    });

    allItems.push(...data.items);
    hasMore = data.items.length === 100;
    page++;
  }

  // Count mentions by the issue/PR author
  const mentionCounts = new Map<string, number>();

  for (const item of allItems) {
    const author = item.user?.login;
    if (author && author !== username) {
      mentionCounts.set(author, (mentionCounts.get(author) || 0) + 1);
    }
  }

  // Sort and return top mentions
  const results = Array.from(mentionCounts.entries())
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return results;
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
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: `involves:${username} type:issue created:${startDate}..${endDate} sort:comments-desc`,
    per_page: 1,
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

interface DiscussionDetail {
  title: string;
  url: string;
  comments: {
    totalCount: number;
  };
  createdAt: string;
  repository: {
    nameWithOwner: string;
  };
}

interface DiscussionSearchResponse {
  search: {
    nodes: Array<DiscussionDetail | null>;
  };
}

export async function fetchMostDiscussedDiscussion(
  year: number
): Promise<IssueDetail | null> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 1) {
          nodes {
            ... on Discussion {
              title
              url
              comments {
                totalCount
              }
              createdAt
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    `;

    // Use involves: to get discussions the user participated in (author or commenter)
    const searchQuery = `involves:${username} created:${startDate}..${endDate} sort:comments-desc`;
    const response = await octokit.graphql<DiscussionSearchResponse>(query, {
      searchQuery,
    });

    const discussion = response.search.nodes[0];
    if (!discussion) return null;

    return {
      title: discussion.title,
      url: discussion.url,
      number: 0, // Discussions don't have numbers in the same way
      repo: discussion.repository.nameWithOwner,
      comments: discussion.comments.totalCount,
      createdAt: discussion.createdAt,
    };
  } catch (error) {
    console.error("Error fetching most discussed discussion:", error);
    return null;
  }
}
