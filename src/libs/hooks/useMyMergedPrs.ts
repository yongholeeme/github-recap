import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchMyMergedPRsByYear, type MergedPr} from '@/libs/github/pullRequests'
import {QUERY_PREFIX} from '@/libs/queryKeys'

/**
 * Fetches all merged PRs for a year using a single request.
 * Falls back to monthly requests only if total exceeds 1000 (GitHub limit).
 */
function useMyMergedPrs(year: number) {
    const user = useUser()

    const query = useQuery({
        queryKey: [QUERY_PREFIX.YEAR, year, 'useMyMergedPrs'] as const,
        queryFn: () => fetchMyMergedPRsByYear(year),
        enabled: !!user,
    })

    return {
        data: query.data ?? [],
        isFetching: query.isFetching,
    }
}

export function useMyAverageMergeTime(year: number) {
    const {data, isFetching} = useMyMergedPrs(year)

    const averageMergeTime = (() => {
        if (!data || data.length === 0) {
            return null
        }

        const mergedPrs = data.filter((pr) => pr.mergedAt && pr.createdAt)
        if (mergedPrs.length === 0) {
            return null
        }

        const totalHours = mergedPrs.reduce((sum, pr) => {
            const createdTime = new Date(pr.createdAt).getTime()
            const mergedTime = new Date(pr.mergedAt!).getTime()
            const hours = (mergedTime - createdTime) / (1000 * 60 * 60)
            return sum + hours
        }, 0)

        return totalHours / mergedPrs.length
    })()

    return {
        data: averageMergeTime,
        isFetching,
    }
}

export function useMyFastestMergedPr(year: number) {
    const {data, isFetching} = useMyMergedPrs(year)

    const fastestPr = (() => {
        if (!data || data.length === 0) {
            return null
        }

        const mergedPrs = data.filter((pr) => pr.mergedAt && pr.createdAt)
        if (mergedPrs.length === 0) {
            return null
        }

        let fastest: (MergedPr & {mergeTimeMs?: number}) | null = null

        for (const pr of mergedPrs) {
            const createdTime = new Date(pr.createdAt).getTime()
            const mergedTime = new Date(pr.mergedAt!).getTime()
            const mergeTimeMs = mergedTime - createdTime

            if (!fastest) {
                fastest = {...pr, mergeTimeMs}
                continue
            }

            const fastestCreatedTime = new Date(fastest.createdAt).getTime()
            const fastestMergedTime = new Date(fastest.mergedAt!).getTime()
            const fastestMergeTimeMs = fastestMergedTime - fastestCreatedTime

            if (mergeTimeMs < fastestMergeTimeMs) {
                fastest = {...pr, mergeTimeMs}
            }
        }

        return fastest
    })()

    return {
        data: fastestPr,
        isFetching,
    }
}

export function useMySlowestMergedPr(year: number) {
    const {data, isFetching} = useMyMergedPrs(year)

    const slowestPr = (() => {
        if (!data || data.length === 0) {
            return null
        }

        const mergedPrs = data.filter((pr) => pr.mergedAt && pr.createdAt)
        if (mergedPrs.length === 0) {
            return null
        }

        let slowest: (MergedPr & {mergeTimeMs?: number}) | null = null

        for (const pr of mergedPrs) {
            const createdTime = new Date(pr.createdAt).getTime()
            const mergedTime = new Date(pr.mergedAt!).getTime()
            const mergeTimeMs = mergedTime - createdTime

            if (!slowest) {
                slowest = {...pr, mergeTimeMs}
                continue
            }

            const slowestCreatedTime = new Date(slowest.createdAt).getTime()
            const slowestMergedTime = new Date(slowest.mergedAt!).getTime()
            const slowestMergeTimeMs = slowestMergedTime - slowestCreatedTime

            if (mergeTimeMs > slowestMergeTimeMs) {
                slowest = {...pr, mergeTimeMs}
            }
        }

        return slowest
    })()

    return {
        data: slowestPr,
        isFetching,
    }
}
