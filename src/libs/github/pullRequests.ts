import {getUsername} from '@/libs/github/auth'
import {fetcher, getDateRange, getMonthDateRange} from '@/libs/github/utils'

interface PRDetail {
    title: string
    url: string
    number: number
    repo: string
    comments: number
    createdAt: string
    mergedAt?: string | null
    closedAt?: string | null
}

export async function fetchMostDiscussedPR(year: number): Promise<PRDetail | null> {
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
            pull_request?: {
                merged_at?: string | null
            }
            closed_at?: string | null
        }[]
    }>({
        pathname: '/search/issues',
        q: `involves:${username} type:pr created:${startDate}..${endDate}`,
        per_page: 1,
        sort: 'comments',
        order: 'desc',
    })

    if (data.items.length === 0) {
        return null
    }

    const pr = data.items[0]
    const [owner, repo] = pr.repository_url.split('/').slice(-2)

    // Fetch detailed comment counts for the top PR
    // Reviews: PR 리뷰 (Approve, Request changes, Comment)
    const reviewsData = await fetcher<{id: number; body: string}[]>({
        pathname: `/repos/${owner}/${repo}/pulls/${pr.number}/reviews`,
        q: '',
        per_page: 100,
        fetchAll: true,
    })

    // Review Comments: 코드 라인별 리뷰 댓글
    const reviewCommentsData = await fetcher<{id: number}[]>({
        pathname: `/repos/${owner}/${repo}/pulls/${pr.number}/comments`,
        q: '',
        per_page: 100,
        fetchAll: true,
    })

    // Total conversations = issue comments + reviews with body + review comments
    // Reviews with empty body are just state changes (APPROVED/CHANGES_REQUESTED), not conversations
    const reviewsWithBody = reviewsData.filter((review) => review.body && review.body.trim().length > 0)

    return {
        title: pr.title,
        url: pr.html_url,
        number: pr.number,
        repo: `${owner}/${repo}`,
        comments: pr.comments + reviewsWithBody.length + reviewCommentsData.length,
        createdAt: pr.created_at,
        mergedAt: pr.pull_request?.merged_at,
        closedAt: pr.closed_at,
    }
}

export interface MergedPr {
    title: string
    url: string
    createdAt: string
    mergedAt?: string | null
    closedAt: string | null
}

interface PRSearchResponse {
    items: {
        title: string
        html_url: string
        created_at: string
        pull_request?: {merged_at?: string | null}
        closed_at: string | null
    }[]
    total_count: number
}

function mapMergedPRs(data: PRSearchResponse): MergedPr[] {
    return data.items.map((item) => ({
        title: item.title,
        url: item.html_url,
        createdAt: item.created_at,
        mergedAt: item.pull_request?.merged_at,
        closedAt: item.closed_at,
    }))
}

/**
 * Fetches all merged PRs for a year in a single request.
 * If total_count > 1000 (GitHub limit), falls back to monthly requests.
 */
export async function fetchMyMergedPRsByYear(year: number): Promise<MergedPr[]> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    // First, check total count
    const countData = await fetcher<PRSearchResponse>({
        pathname: '/search/issues',
        q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
        per_page: 1,
    })

    // If over 1000, fall back to monthly requests
    if (countData.total_count > 1000) {
        return fetchMyMergedPRsMonthly(username, year)
    }

    // Fetch all PRs in single paginated request
    const data = await fetcher<PRSearchResponse>({
        pathname: '/search/issues',
        q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    return mapMergedPRs(data)
}

async function fetchMyMergedPRsMonthly(username: string, year: number): Promise<MergedPr[]> {
    const allPRs: MergedPr[] = []

    for (let month = 1; month <= 12; month++) {
        const {startDate, endDate} = getMonthDateRange(year, month)

        const data = await fetcher<PRSearchResponse>({
            pathname: '/search/issues',
            q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
            per_page: 100,
            fetchAll: true,
        })

        allPRs.push(...mapMergedPRs(data))
    }

    return allPRs
}
