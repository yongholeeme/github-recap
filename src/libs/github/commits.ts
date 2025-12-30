import {getUsername} from '@/libs/github/auth'
import {fetcher, getDateRange, getMonthDateRange} from '@/libs/github/utils'

export interface SimplifiedCommit {
    message: string
    committedDate: string
    url: string
}

interface CommitSearchResponse {
    items: {
        commit: {message: string; author?: {date: string}}
        html_url: string
    }[]
    total_count: number
}

function mapCommits(data: CommitSearchResponse): SimplifiedCommit[] {
    return data.items.map((item) => ({
        message: item.commit.message,
        committedDate: item.commit.author?.date || '',
        url: item.html_url,
    }))
}

/**
 * Fetches all commits for a year in a single request.
 * If total_count > 1000 (GitHub limit), falls back to monthly requests.
 */
export async function fetchCommitsByYear(year: number): Promise<SimplifiedCommit[]> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    // First, check total count with minimal request
    const countData = await fetcher<CommitSearchResponse>({
        pathname: '/search/commits',
        q: `author:${username} committer-date:${startDate}..${endDate}`,
        per_page: 1,
    })

    // GitHub Search API returns max 1000 results
    // If over 1000, fall back to monthly requests
    if (countData.total_count > 1000) {
        return fetchCommitsByYearMonthly(username, year)
    }

    // Fetch all commits in single paginated request
    const data = await fetcher<CommitSearchResponse>({
        pathname: '/search/commits',
        q: `author:${username} committer-date:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    return mapCommits(data)
}

/**
 * Fallback: Fetches commits month by month when yearly total exceeds 1000.
 * This bypasses the 1000 result limit by splitting into smaller date ranges.
 */
async function fetchCommitsByYearMonthly(username: string, year: number): Promise<SimplifiedCommit[]> {
    const allCommits: SimplifiedCommit[] = []

    // Fetch sequentially to avoid rate limiting
    for (let month = 1; month <= 12; month++) {
        const {startDate, endDate} = getMonthDateRange(year, month)

        const data = await fetcher<CommitSearchResponse>({
            pathname: '/search/commits',
            q: `author:${username} committer-date:${startDate}..${endDate}`,
            per_page: 100,
            fetchAll: true,
        })

        allCommits.push(...mapCommits(data))
    }

    return allCommits
}

export async function fetchCountOfCommits(year: number): Promise<number> {
    const username = await getUsername()
    const {startDate, endDate} = getDateRange(year)

    const data = await fetcher<{total_count: number}>({
        pathname: '/search/commits',
        q: `author:${username} committer-date:${startDate}..${endDate}`,
        per_page: 1,
        page: 1,
    })

    return data.total_count || 0
}

export interface RepositoryCommitStats {
    repo: string
    owner: string
    commitCount: number
}
