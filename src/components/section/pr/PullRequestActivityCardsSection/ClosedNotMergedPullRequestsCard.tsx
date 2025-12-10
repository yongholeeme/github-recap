import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMyClosedPrsNotMerged} from '@/libs/hooks/useCountOfMyClosedPrsNotMerged'

export default function ClosedNotMergedPullRequestsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfMyClosedPrsNotMerged(year)

    return (
        <StatCard
            title="닫힌 PR"
            description="머지되지 않음"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
