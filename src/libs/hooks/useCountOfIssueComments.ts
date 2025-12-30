import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfIssueComments(year: number) {
    return useSelectCount(year, (data) => data.issueComments)
}
