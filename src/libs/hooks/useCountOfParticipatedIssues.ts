import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfParticipatedIssues(year: number) {
    return useSelectCount(year, (data) => data.participatedIssues)
}
