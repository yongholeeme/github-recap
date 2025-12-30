import {getOctokit, getUsername} from '@/libs/github/auth'
import {getDateRange} from '@/libs/github/utils'

export interface AllCounts {
    // PR counts
    myCreatedPrs: number
    myMergedPrs: number
    prsReviewedByMe: number
    participatedPrs: number
    prsApprovedByMe: number
    prsRequestedChangeByMe: number
    commentsByMeToPr: number
    myClosedPrsNotMerged: number
    // Issue counts
    issueComments: number
    participatedIssues: number
    mentionsMe: number
    // Discussion counts
    discussionComments: number
    participatedDiscussions: number
}

interface BatchCountsResponse {
    myCreatedPrs: {issueCount: number}
    myMergedPrs: {issueCount: number}
    prsReviewedByMe: {issueCount: number}
    participatedPrs: {issueCount: number}
    prsApprovedByMe: {issueCount: number}
    prsRequestedChangeByMe: {issueCount: number}
    commentsByMeToPr: {issueCount: number}
    myClosedPrsNotMerged: {issueCount: number}
    issueComments: {issueCount: number}
    participatedIssues: {issueCount: number}
    mentionsMe: {issueCount: number}
    participatedDiscussions: {discussionCount: number}
}

interface DiscussionCommentsResponse {
    search: {
        nodes: {
            comments?: {
                nodes: {
                    author: {login: string} | null
                    createdAt: string
                }[]
            }
        }[]
    }
}

/**
 * Fetches all year-based counts in a single GraphQL request
 * Reduces 13 individual API calls to 2 GraphQL calls
 */
export async function fetchAllCounts(year: number): Promise<AllCounts> {
    const octokit = await getOctokit()
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    // Batch query for all PR and Issue counts using GraphQL aliasing
    const batchQuery = `
    query {
      myCreatedPrs: search(query: "author:${username} type:pr created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      myMergedPrs: search(query: "author:${username} type:pr is:merged merged:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      prsReviewedByMe: search(query: "reviewed-by:${username} type:pr created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      participatedPrs: search(query: "involves:${username} type:pr created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      prsApprovedByMe: search(query: "reviewed-by:${username} type:pr review:approved created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      prsRequestedChangeByMe: search(query: "reviewed-by:${username} type:pr review:changes_requested created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      commentsByMeToPr: search(query: "commenter:${username} type:pr updated:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      myClosedPrsNotMerged: search(query: "author:${username} type:pr is:closed is:unmerged closed:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      issueComments: search(query: "commenter:${username} type:issue updated:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      participatedIssues: search(query: "involves:${username} type:issue created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      mentionsMe: search(query: "mentions:${username} created:${startDate}..${endDate}", type: ISSUE, first: 1) {
        issueCount
      }
      participatedDiscussions: search(query: "involves:${username} created:${startDate}..${endDate}", type: DISCUSSION, first: 1) {
        discussionCount
      }
    }
  `

    try {
        const response = await octokit.graphql<BatchCountsResponse>(batchQuery)

        // Discussion comments need separate calculation (count user's comments, not total discussions)
        const discussionComments = await fetchDiscussionCommentsCount(octokit, username, startDate, endDate)

        return {
            myCreatedPrs: response.myCreatedPrs.issueCount,
            myMergedPrs: response.myMergedPrs.issueCount,
            prsReviewedByMe: response.prsReviewedByMe.issueCount,
            participatedPrs: response.participatedPrs.issueCount,
            prsApprovedByMe: response.prsApprovedByMe.issueCount,
            prsRequestedChangeByMe: response.prsRequestedChangeByMe.issueCount,
            commentsByMeToPr: response.commentsByMeToPr.issueCount,
            myClosedPrsNotMerged: response.myClosedPrsNotMerged.issueCount,
            issueComments: response.issueComments.issueCount,
            participatedIssues: response.participatedIssues.issueCount,
            mentionsMe: response.mentionsMe.issueCount,
            discussionComments,
            participatedDiscussions: response.participatedDiscussions.discussionCount,
        }
    } catch (error) {
        console.error('Error fetching batch counts:', error)
        throw error
    }
}

async function fetchDiscussionCommentsCount(
    octokit: Awaited<ReturnType<typeof getOctokit>>,
    username: string,
    startDate: string,
    endDate: string,
): Promise<number> {
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
  `

    const searchQuery = `commenter:${username} created:${startDate}..${endDate}`

    try {
        const response = await octokit.graphql<DiscussionCommentsResponse>(query, {searchQuery})

        let totalComments = 0
        const start = new Date(startDate)
        const end = new Date(endDate)

        for (const discussion of response.search.nodes || []) {
            if (discussion?.comments?.nodes) {
                for (const comment of discussion.comments.nodes) {
                    if (comment.author?.login === username) {
                        const commentDate = new Date(comment.createdAt)
                        if (commentDate >= start && commentDate <= end) {
                            totalComments++
                        }
                    }
                }
            }
        }

        return totalComments
    } catch (error) {
        console.error('Error fetching discussion comments count:', error)
        return 0
    }
}
