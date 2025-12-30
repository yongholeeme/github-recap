import {useSelectCount} from '@/libs/hooks/useAllCounts'

export function useCountOfMentionsMe(year: number) {
    return useSelectCount(year, (data) => data.mentionsMe)
}
