import StatCard from '@/components/common/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfCommentsByMeToPr} from '@/lib/hooks/useCountOfCommentsByMeToPr'

export default function PullRequestReviewCommentsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfCommentsByMeToPr(year)

    return (
        <StatCard
            title="리뷰 댓글"
            description="코드 리뷰 댓글"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
