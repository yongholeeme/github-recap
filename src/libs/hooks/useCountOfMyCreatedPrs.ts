import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfMyCreatedPrs(year: number) {
    return useSelectCount(year, (data) => data.myCreatedPrs)
}
