import {getUsername} from '@/lib/github/auth'
import {fetcher, getDateRange, getMonthDateRange} from '@/lib/github/utils'

export async function fetchCountOfMyCreatedPrs(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `author:${username} type:pr created:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfMyMergedPrs(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfPrsReviewedByMe(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `reviewed-by:${username} type:pr created:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfParticipatedPrs(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `involves:${username} type:pr created:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfPrsApprovedByMe(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `reviewed-by:${username} type:pr review:approved created:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfPrsRequestedChangeByMe(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `reviewed-by:${username} type:pr review:changes_requested created:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfCommentsByMeToPr(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `commenter:${username} type:pr updated:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

export async function fetchCountOfMyClosedPrsNotMerged(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/issues',
        q: `author:${username} type:pr is:closed is:unmerged closed:${startDate}..${endDate}`,
        per_page: 1,
    })

    return data.total_count || 0
}

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

    if (data.items.length === 0) {return null}

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

interface Pr {
    title: string
    url: string
    createdAt: string
    mergedAt?: string | null
    closedAt: string | null
}

export async function fetchMyMergedPRs(year: number, month: number): Promise<Pr[]> {
    const username = await getUsername()
    const {startDate, endDate} = getMonthDateRange(year, month)

    const data = await fetcher<{
        items: {
            title: string
            html_url: string
            created_at: string
            pull_request?: {merged_at?: string | null}
            closed_at: string | null
        }[]
        total_count: number
    }>({
        pathname: '/search/issues',
        q: `author:${username} type:pr is:merged merged:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    const prs = data.items.map((item) => ({
        title: item.title,
        url: item.html_url,
        createdAt: item.created_at,
        mergedAt: item.pull_request?.merged_at,
        closedAt: item.closed_at,
    }))

    return prs
}
