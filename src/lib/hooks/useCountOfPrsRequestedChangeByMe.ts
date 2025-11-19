import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfPrsRequestedChangeByMe} from '@/lib/github/pullRequests'
import {queryKeys} from '@/lib/queryKeys'


export function useCountOfPrsRequestedChangeByMe(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfPrsRequestedChangeByMe(year),
        queryFn: () => fetchCountOfPrsRequestedChangeByMe(year),
        enabled: !!user,
    })
}
