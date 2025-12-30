import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfMyMergedPrs(year: number) {
    return useSelectCount(year, (data) => data.myMergedPrs)
}
