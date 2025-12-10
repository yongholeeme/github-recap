import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsApprovedByMe} from '@/libs/hooks/useCountOfPrsApprovedByMe'

export default function ApprovedPullRequestsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsApprovedByMe(year)

    return (
        <StatCard
            title="승인한 PR"
            description="Approve"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
