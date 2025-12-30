import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfMyClosedPrsNotMerged(year: number) {
    return useSelectCount(year, (data) => data.myClosedPrsNotMerged)
}
