import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfIssueComments} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfIssueComments(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfIssueComments(year),
        queryFn: () => fetchCountOfIssueComments(year),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!user,
    })
}
