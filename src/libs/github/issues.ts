import {getOctokit, getUsername} from '@/libs/github/auth'
import {fetcher, getDateRange, getMonthDateRange} from '@/libs/github/utils'

export async function fetchInvolvedIssues(username: string, year: number): Promise<{repository_url: string}[]> {
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{
        items: {
            repository_url: string
        }[]
    }>({
        pathname: '/search/issues',
        q: `involves:${username} type:issue created:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    return data.items
}

export async function fetchInvolvedDiscussions(
    username: string,
    year: number,
): Promise<{repository: {nameWithOwner: string}}[]> {
    const octokit = await getOctokit()
    const {startDate, endDate} = getDateRange(year)

    try {
        const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 100) {
          nodes {
            ... on Discussion {
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    `

        const searchQuery = `involves:${username} created:${startDate}..${endDate}`
        const response = await octokit.graphql<{
            search: {
                nodes: ({
                    repository: {nameWithOwner: string}
                } | null)[]
            }
        }>(query, {
            searchQuery,
        })

        return (response.search.nodes || []).filter(
            (node): node is {repository: {nameWithOwner: string}} => node !== null,
        )
    } catch (error) {
        console.error('Error fetching involved discussions:', error)
        return []
    }
}

export interface MentionDetail {
    username: string
    count: number
}

export async function fetchMentionsByMonth(year: number, month: number): Promise<(string | null)[]> {
    const username = await getUsername()
    const {startDate, endDate} = getMonthDateRange(year, month)

    const data = await fetcher<{
        items: {user?: {login: string} | null}[]
        total_count: number
    }>({
        pathname: '/search/issues',
        q: `mentions:${username} created:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    const items = data.items.map((item) => item.user?.login ?? null)

    return items
}

interface IssueDetail {
    title: string
    url: string
    number: number
    repo: string
    comments: number
    createdAt: string
    closedAt?: string | null
}

export async function fetchMostDiscussedIssue(year: number): Promise<IssueDetail | null> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{
        items: {
            title: string
            html_url: string
            number: number
            repository_url: string
            comments: number
            created_at: string
            closed_at?: string | null
        }[]
    }>({
        pathname: '/search/issues',
        q: `involves:${username} type:issue created:${startDate}..${endDate}`,
        per_page: 100,
        sort: 'comments',
        order: 'desc',
    })

    if (data.items.length === 0) {
        return null
    }

    const issue = data.items[0]
    return {
        title: issue.title,
        url: issue.html_url,
        number: issue.number,
        repo: issue.repository_url.split('/').slice(-2).join('/'),
        comments: issue.comments,
        createdAt: issue.created_at,
        closedAt: issue.closed_at,
    }
}

export async function fetchMostDiscussedDiscussion(year: number): Promise<IssueDetail | null> {
    const octokit = await getOctokit()
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    try {
        // Optimized: Only fetch totalCount for replies, no need for reply nodes
        // 20 discussions × 20 comments = 400 nodes (much smaller than before)
        const query = `
      query($searchQuery: String!) {
        search(query: $searchQuery, type: DISCUSSION, first: 20) {
          nodes {
            ... on Discussion {
              title
              url
              createdAt
              repository {
                nameWithOwner
              }
              comments(first: 20) {
                totalCount
                nodes {
                  replies {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    `

        // Use involves: to get discussions the user participated in (author or commenter)
        // Note: GraphQL search doesn't support sort parameter, need to fetch multiple and sort manually
        const searchQuery = `involves:${username} created:${startDate}..${endDate}`
        const response = await octokit.graphql<{
            search: {
                nodes: ({
                    title: string
                    url: string
                    createdAt: string
                    repository: {nameWithOwner: string}
                    comments: {
                        totalCount: number
                        nodes: {
                            replies: {
                                totalCount: number
                            }
                        }[]
                    }
                } | null)[]
            }
        }>(query, {
            searchQuery,
        })

        if (!response.search.nodes || response.search.nodes.length === 0) {
            return null
        }

        // Calculate total comments (comments + all replies) for each discussion and find the most discussed one
        let mostDiscussed: IssueDetail | null = null
        let maxComments = -1

        for (const discussion of response.search.nodes) {
            if (!discussion) {
                continue
            }

            // Total = direct comments + all replies
            const totalReplies = discussion.comments.nodes.reduce((sum, comment) => sum + comment.replies.totalCount, 0)
            const totalComments = discussion.comments.totalCount + totalReplies

            if (totalComments > maxComments) {
                maxComments = totalComments
                mostDiscussed = {
                    title: discussion.title,
                    url: discussion.url,
                    number: 0, // Discussions don't have numbers in the same way
                    repo: discussion.repository.nameWithOwner,
                    comments: totalComments,
                    createdAt: discussion.createdAt,
                }
            }
        }

        return mostDiscussed
    } catch (error) {
        console.error('Error fetching most discussed discussion:', error)
        return null
    }
}
