import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfMyMergedPrs} from '@/lib/github/pullRequests'
import {queryKeys} from '@/lib/queryKeys'


export function useCountOfMyMergedPrs(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfMyMergedPrs(year),
        queryFn: () => fetchCountOfMyMergedPrs(year),
        enabled: !!user,
    })
}
