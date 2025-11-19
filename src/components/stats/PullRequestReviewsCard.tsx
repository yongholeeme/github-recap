import StatCard from '@/components/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsReviewedByMe} from '@/lib/hooks/useCountOfPrsReviewedByMe'

export default function PullRequestReviewsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsReviewedByMe(year)

    return (
        <StatCard
            title="PR 리뷰"
            description="리뷰한 PR"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
