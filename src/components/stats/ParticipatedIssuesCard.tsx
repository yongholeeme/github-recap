import StatCard from '@/components/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedIssues} from '@/lib/hooks/useCountOfParticipatedIssues'

export default function ParticipatedIssuesCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfParticipatedIssues(year)

    return (
        <StatCard
            title="참여한 이슈"
            description="작성 + 코멘트"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
