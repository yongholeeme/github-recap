import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfPrsReviewedByMe(year: number) {
    return useSelectCount(year, (data) => data.prsReviewedByMe)
}
