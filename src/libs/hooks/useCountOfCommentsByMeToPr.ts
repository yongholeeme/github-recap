import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfCommentsByMeToPr(year: number) {
    return useSelectCount(year, (data) => data.commentsByMeToPr)
}
