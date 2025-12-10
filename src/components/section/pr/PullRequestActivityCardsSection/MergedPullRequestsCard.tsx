import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMyMergedPrs} from '@/libs/hooks/useCountOfMyMergedPrs'

export default function MergedPullRequestsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfMyMergedPrs(year)

    return (
        <StatCard
            title="머지된 PR"
            description="병합 완료"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
