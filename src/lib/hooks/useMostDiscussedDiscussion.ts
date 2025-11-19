import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchMostDiscussedDiscussion} from '@/lib/github/issues'
import {queryKeys} from '@/lib/queryKeys'


export function useMostDiscussedDiscussion(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useMostDiscussedDiscussion(year),
        queryFn: () => fetchMostDiscussedDiscussion(year),
        enabled: !!user,
    })
}
