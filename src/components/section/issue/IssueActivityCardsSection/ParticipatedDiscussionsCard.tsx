import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedDiscussions} from '@/libs/hooks/useCountOfParticipatedDiscussions'

export default function ParticipatedDiscussionsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfParticipatedDiscussions(year)

    return (
        <StatCard
            title="참여한 디스커션"
            description="작성 + 코멘트"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
