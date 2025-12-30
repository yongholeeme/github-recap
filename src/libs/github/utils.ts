import {config} from '@config'
import {startOfMonth, endOfMonth, startOfYear, endOfYear, format} from 'date-fns'


export function getDateRange(year: number) {
    const yearStart = startOfYear(new Date(year, 0, 1))
    const yearEnd = endOfYear(new Date(year, 11, 31))

    return {
        startDate: format(yearStart, 'yyyy-MM-dd'),
        endDate: format(yearEnd, 'yyyy-MM-dd'),
    }
}

export function getMonthDateRange(year: number, month: number) {
    const date = new Date(year, month - 1, 1)
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    return {
        startDate: format(monthStart, 'yyyy-MM-dd'),
        endDate: format(monthEnd, 'yyyy-MM-dd'),
    }
}

export async function fetcher<T = unknown>({
    pathname,
    q,
    per_page,
    page = 1,
    sort,
    order,
    fetchAll = false,
}: {
    pathname: string
    q: string
    per_page: number
    page?: number
    sort?: string
    order?: string
    fetchAll?: boolean
}): Promise<T> {
    const url = new URL(`${config.github.apiUrl}${pathname}`)

    // For non-search endpoints (like /repos/{owner}/{repo}/pulls/{number}/reviews)
    const isSearchEndpoint = pathname.includes('/search/')

    if (isSearchEndpoint && q) {
        url.searchParams.append('q', q)
    }

    url.searchParams.append('per_page', String(per_page))
    url.searchParams.append('page', String(page))

    if (sort) {
        url.searchParams.append('sort', sort)
    }
    if (order) {
        url.searchParams.append('order', order)
    }

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('github_pat_token')}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    // Auto-pagination: if per_page is 100 and fetchAll is true, fetch all pages
    // GitHub Search API limit: max 1000 results (10 pages × 100)
    const MAX_SEARCH_PAGES = 10

    if (fetchAll && per_page === 100) {
        if (Array.isArray(data)) {
            // For direct array responses (e.g., /repos/{owner}/{repo}/pulls/{number}/reviews)
            // Non-search endpoints don't have the 1000 result limit
            if (data.length === 100) {
                const nextPage = await fetcher<T>({
                    pathname,
                    q,
                    per_page,
                    page: page + 1,
                    sort,
                    order,
                    fetchAll: true,
                })
                return [...data, ...(Array.isArray(nextPage) ? nextPage : [])] as T
            }
        } else if (data.items && Array.isArray(data.items)) {
            // For search API responses with items array
            // Stop at page 10 to avoid 422 error (GitHub Search API limit)
            if (data.items.length === 100 && page < MAX_SEARCH_PAGES) {
                const nextPage = await fetcher<{items: unknown[]}>({
                    pathname,
                    q,
                    per_page,
                    page: page + 1,
                    sort,
                    order,
                    fetchAll: true,
                })
                return {
                    ...data,
                    items: [...data.items, ...(nextPage.items || [])],
                } as T
            }
        }
    }

    return data
}
