import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfMyClosedPrsNotMerged} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfMyClosedPrsNotMerged(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfMyClosedPrsNotMerged(year),
        queryFn: () => fetchCountOfMyClosedPrsNotMerged(year),
        enabled: !!user,
    })
}
