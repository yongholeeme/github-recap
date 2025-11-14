import { getOctokit, getUsername } from "@/lib/github/auth";
import { getDateRange } from "@/lib/github/utils";

export async function getIssuesCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const query = `author:${username} type:issue created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1, // Only need total_count
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
    per_page: 1, // Only need total_count
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
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export async function getParticipatedIssuesCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Search for issues where user is involved (author, commenter, or mentioned)
  const query = `involves:${username} type:issue created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1, // Only need total_count
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
    per_page: 1, // Only need total_count
  });

  return data.total_count || 0;
}

export interface MentionDetail {
  username: string;
  count: number;
}

export async function getTopMentionedBy(
  year: number = new Date().getFullYear(),
  limit: number = 5
): Promise<MentionDetail[]> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // GitHub Search API searches both body and comments!
  const query = `mentions:${username} created:${startDate}..${endDate}`;

  // Fetch with pagination
  const allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    // Max 1000 items
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      per_page: 100,
      page,
    });

    allItems.push(...data.items);
    hasMore = data.items.length === 100;
    page++;
  }

  // Count mentions by the issue/PR author
  const mentionCounts = new Map<string, number>();

  console.log(
    `[getTopMentionedBy] Found ${allItems.length} items where @${username} was mentioned`
  );

  for (const item of allItems) {
    const author = item.user?.login;
    if (author && author !== username) {
      mentionCounts.set(author, (mentionCounts.get(author) || 0) + 1);
      console.log(
        `[getTopMentionedBy] ${author} mentioned you in: ${item.title}`,
        item.html_url
      );
    }
  }

  console.log(mentionCounts);

  // Sort and return top mentions
  const results = Array.from(mentionCounts.entries())
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  console.log("[getTopMentionedBy] Top mentions:", results);

  return results;
}

type GitHubIssueOrPR = Awaited<
  ReturnType<
    Awaited<
      ReturnType<typeof getOctokit>
    >["rest"]["search"]["issuesAndPullRequests"]
  >
>["data"]["items"][number];

async function fetchAllPages(
  octokit: Awaited<ReturnType<typeof getOctokit>>,
  query: string
): Promise<GitHubIssueOrPR[]> {
  const allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) {
    // Max 1000 items
    try {
      const { data } = await octokit.rest.search.issuesAndPullRequests({
        q: query,
        per_page: 100,
        page,
      });

      allItems.push(...data.items);
      hasMore = data.items.length === 100;
      page++;
    } catch (error) {
      console.error("Error fetching page:", page, error);
      break;
    }
  }

  return allItems;
}

export async function getTopMentionedUsers(
  year: number = new Date().getFullYear(),
  limit: number = 5
): Promise<MentionDetail[]> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  const mentionCounts = new Map<string, number>();

  try {
    // Fetch all queries with pagination in parallel
    const queries = [
      `author:${username} type:issue created:${startDate}..${endDate}`,
      `author:${username} type:pr created:${startDate}..${endDate}`,
      `commenter:${username} created:${startDate}..${endDate}`,
    ];

    const results = await Promise.all(
      queries.map((query) => fetchAllPages(octokit, query))
    );

    // Deduplicate items by URL
    const processedUrls = new Set<string>();
    const uniqueItems = [];

    for (const items of results) {
      for (const item of items) {
        if (!processedUrls.has(item.url)) {
          processedUrls.add(item.url);
          uniqueItems.push(item);
        }
      }
    }

    // Only scan body text for mentions (lightweight)
    console.log(
      `[getTopMentionedUsers] Processing ${uniqueItems.length} unique items`
    );

    for (const item of uniqueItems) {
      const body = item.body || "";

      // More accurate mention detection:
      // 1. Remove code blocks (```...```) to avoid false positives
      const bodyWithoutCodeBlocks = body.replace(/```[\s\S]*?```/g, "");
      // 2. Remove inline code (`...`)
      const bodyWithoutCode = bodyWithoutCodeBlocks.replace(/`[^`]*`/g, "");
      // 3. Find @mentions (GitHub converts real mentions to links)
      // Pattern: @username with word boundaries
      const bodyMentions = bodyWithoutCode.match(/@(\w[\w-]*)/g) || [];

      if (bodyMentions.length > 0) {
        console.log(
          `[getTopMentionedUsers] Found mentions in "${item.title}":`,
          bodyMentions,
          item.html_url
        );
      }
      for (const mention of bodyMentions) {
        const mentionedUser = mention.slice(1);
        // Filter out common false positives
        if (
          mentionedUser !== username &&
          mentionedUser.length > 1 &&
          !mentionedUser.match(/^\d+$/)
        ) {
          // not just numbers
          mentionCounts.set(
            mentionedUser,
            (mentionCounts.get(mentionedUser) || 0) + 1
          );
          console.log(
            `[getTopMentionedUsers] You mentioned @${mentionedUser} in: ${item.title}`,
            item.html_url
          );
        }
      }
    }
  } catch (error) {
    console.error("Error fetching mentioned users:", error);
  }

  // Sort and return top mentions
  const results = Array.from(mentionCounts.entries())
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  console.log("[getTopMentionedUsers] Top mentioned users:", results);

  return results;
}

export async function getMentionedUsersCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const details = await getTopMentionedUsers(year, 100);
  return details.reduce((sum, detail) => sum + detail.count, 0);
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

export async function getCreatedDiscussionsCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  try {
    const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 1) {
          discussionCount
        }
      }
    `;

    const searchQuery = `author:${username} created:${startDate}..${endDate}`;
    const response = await octokit.graphql<DiscussionCountResponse>(query, {
      searchQuery,
    });

    return response.search.discussionCount || 0;
  } catch (error) {
    console.error("Error fetching discussions count:", error);
    return 0;
  }
}

export async function getDiscussionCommentsCount(
  year: number = new Date().getFullYear()
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

export async function getParticipatedDiscussionsCount(
  year: number = new Date().getFullYear()
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
