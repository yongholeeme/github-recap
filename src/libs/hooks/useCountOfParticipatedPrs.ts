import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfParticipatedPrs} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfParticipatedPrs(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfParticipatedPrs(year),
        queryFn: () => fetchCountOfParticipatedPrs(year),
        enabled: !!user,
    })
}
