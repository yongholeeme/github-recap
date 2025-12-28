import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfParticipatedDiscussions} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfParticipatedDiscussions(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfParticipatedDiscussions(year),
        queryFn: () => fetchCountOfParticipatedDiscussions(year),
        enabled: !!user,
    })
}
