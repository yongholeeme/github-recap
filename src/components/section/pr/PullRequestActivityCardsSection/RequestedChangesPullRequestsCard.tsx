import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsRequestedChangeByMe} from '@/libs/hooks/useCountOfPrsRequestedChangeByMe'

export default function RequestedChangesPullRequestsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsRequestedChangeByMe(year)

    return (
        <StatCard
            title="변경 요청"
            description="Request Changes"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
