import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfIssueComments} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfIssueComments(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfIssueComments(year),
        queryFn: () => fetchCountOfIssueComments(year),
        enabled: !!user,
    })
}
