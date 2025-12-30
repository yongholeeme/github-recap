import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfDiscussionComments(year: number) {
    return useSelectCount(year, (data) => data.discussionComments)
}
