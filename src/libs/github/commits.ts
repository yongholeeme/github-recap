import {getUsername} from '@/libs/github/auth'
import {fetcher, getDateRange, getMonthDateRange} from '@/libs/github/utils'

export interface SimplifiedCommit {
    message: string // !
    committedDate: string // !
    url: string
}

export async function fetchCommitsByMonth(year: number, month: number): Promise<SimplifiedCommit[]> {
    const username = await getUsername()
    const {startDate, endDate} = getMonthDateRange(Number(year), Number(month))

    const data = await fetcher<{
        items: {
            commit: {message: string; author?: {date: string}}
            html_url: string
        }[]
        total_count: number
    }>({
        pathname: '/search/commits',
        q: `author:${username} committer-date:${startDate}..${endDate}`,
        per_page: 100,
        fetchAll: true,
    })

    const commits: SimplifiedCommit[] = data.items.map((item) => ({
        message: item.commit.message,
        committedDate: item.commit.author?.date || '',
        url: item.html_url,
    }))

    return commits
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
