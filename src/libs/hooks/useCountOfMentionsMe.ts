import {useQuery} from '@tanstack/react-query'

import {useUser} from '@/contexts/UserContext'
import {fetchCountOfMentionsMe} from '@/libs/github/issues'
import {queryKeys} from '@/libs/queryKeys'

export function useCountOfMentionsMe(year: number) {
    const user = useUser()

    return useQuery({
        queryKey: queryKeys.useCountOfMentionsMe(year),
        queryFn: () => fetchCountOfMentionsMe(year),
        enabled: !!user,
    })
}
