import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfCommits} from '@/libs/github/commits'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfCommits(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfCommits(year),
        queryFn: () => fetchCountOfCommits(year),
        enabled: !!user,
    })
}
