import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfMyCreatedPrs} from '@/libs/github/pullRequests'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfMyCreatedPrs(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfMyCreatedPrs(year),
        queryFn: () => fetchCountOfMyCreatedPrs(year),
        enabled: !!user,
    })
}
