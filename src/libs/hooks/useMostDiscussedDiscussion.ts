import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchMostDiscussedDiscussion} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useMostDiscussedDiscussion(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useMostDiscussedDiscussion(year),
        queryFn: () => fetchMostDiscussedDiscussion(year),
        enabled: !!user,
    })
}
