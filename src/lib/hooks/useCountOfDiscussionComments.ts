import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfDiscussionComments} from '@/lib/github/issues'
import {queryKeys} from '@/lib/queryKeys'


export function useCountOfDiscussionComments(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfDiscussionComments(year),
        queryFn: () => fetchCountOfDiscussionComments(year),
        enabled: !!user,
    })
}
