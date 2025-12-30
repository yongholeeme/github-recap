import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfPrsRequestedChangeByMe(year: number) {
    return useSelectCount(year, (data) => data.prsRequestedChangeByMe)
}
