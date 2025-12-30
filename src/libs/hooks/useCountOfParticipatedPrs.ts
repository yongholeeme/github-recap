import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfParticipatedPrs(year: number) {
    return useSelectCount(year, (data) => data.participatedPrs)
}
