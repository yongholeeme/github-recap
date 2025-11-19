import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfParticipatedPrs} from '@/lib/github/pullRequests'
import {queryKeys} from '@/lib/queryKeys'

export function useCountOfParticipatedPrs(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfParticipatedPrs(year),
        queryFn: () => fetchCountOfParticipatedPrs(year),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!user,
    })
}
