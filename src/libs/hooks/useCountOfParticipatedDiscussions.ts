import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfParticipatedDiscussions(year: number) {
    return useSelectCount(year, (data) => data.participatedDiscussions)
}
