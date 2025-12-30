import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {type AllCounts, fetchAllCounts} from '@/libs/github/batchCounts'
import {QUERY_PREFIX} from '@/libs/queryKeys'

// Type for select functions
type SelectFn<T> = (data: AllCounts) => T

/**
 * Helper hook to select a specific count from the batched response.
 * Uses TanStack Query's select option for efficient data extraction.
 */
export function useSelectCount<T>(year: number, select: SelectFn<T>) {
    const user = useUser()

    return useQuery({
        queryKey: [QUERY_PREFIX.YEAR, year, 'useAllCounts'] as const,
        queryFn: () => fetchAllCounts(year),
        enabled: !!user,
        select,
    })
}
