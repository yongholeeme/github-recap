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
  // Just use mentions: qualifier - it already includes comments
  const query = `mentions:${username} created:${startDate}..${endDate}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 100,
  });

  // Count mentions by the issue/PR author (simplified approach)
  // For more accurate count, we'd need to parse all comments which is expensive
  const mentionCounts = new Map<string, number>();

  console.log(
    `[getTopMentionedBy] Found ${data.items.length} items where @${username} was mentioned`
  );

  for (const item of data.items) {
    const author = item.user?.login;
    if (author && author !== username) {
      mentionCounts.set(author, (mentionCounts.get(author) || 0) + 1);
      console.log(
        `[getTopMentionedBy] ${author} mentioned you in: ${item.title}`,
        item.html_url
      );
    }
  }

  // Sort and return top mentions
  const results = Array.from(mentionCounts.entries())
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  console.log("[getTopMentionedBy] Top mentions:", results);

  return results;
}

export async function getTopMentionedUsers(
  year: number = new Date().getFullYear(),
  limit: number = 5
): Promise<MentionDetail[]> {
  const octokit = await getOctokit();
  const username = await getUsername();
  const { startDate, endDate } = getDateRange(year);

  // Smart approach: Use GitHub Code Search to find @mentions in content
  // Search in issues and PRs authored or commented by user
  const mentionCounts = new Map<string, number>();

  try {
    // Search for @mentions in issues/PRs where user is author or commenter
    // GitHub search includes body and comments automatically!
    const queries = [
      `author:${username} type:issue created:${startDate}..${endDate}`,
      `author:${username} type:pr created:${startDate}..${endDate}`,
      `commenter:${username} created:${startDate}..${endDate}`,
    ];

    // Fetch all queries in parallel
    const results = await Promise.all(
      queries.map((query) =>
        octokit.rest.search
          .issuesAndPullRequests({
            q: query,
            per_page: 100,
          })
          .catch((error) => {
            console.error("Error in query:", query, error);
            return { data: { items: [] } };
          })
      )
    );

    // Deduplicate items by URL
    const processedUrls = new Set<string>();
    const uniqueItems = [];

    for (const result of results) {
      for (const item of result.data.items) {
        if (!processedUrls.has(item.url)) {
          processedUrls.add(item.url);
          uniqueItems.push(item);
        }
      }
    }

    // Only scan body text for mentions (lightweight)
    // Note: This won't catch mentions in comments, but it's much faster
    // For full accuracy, would need to fetch all comments (expensive)
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

export async function getMentionedByCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const details = await getTopMentionedBy(year, 100);
  return details.reduce((sum, detail) => sum + detail.count, 0);
}

export async function getMentionedUsersCount(
  year: number = new Date().getFullYear()
): Promise<number> {
  const details = await getTopMentionedUsers(year, 100);
  return details.reduce((sum, detail) => sum + detail.count, 0);
}
