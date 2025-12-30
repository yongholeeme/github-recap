import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfPrsApprovedByMe(year: number) {
    return useSelectCount(year, (data) => data.prsApprovedByMe)
}
