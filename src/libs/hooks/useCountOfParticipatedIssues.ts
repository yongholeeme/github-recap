import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfParticipatedIssues} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfParticipatedIssues(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfParticipatedIssues(year),
        queryFn: () => fetchCountOfParticipatedIssues(year),
        enabled: !!user,
    })
}
