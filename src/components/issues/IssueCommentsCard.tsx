import StatCard from '@/components/common/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfIssueComments} from '@/lib/hooks/useCountOfIssueComments'

export default function IssueCommentsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfIssueComments(year)

    return (
        <StatCard
            title="이슈 코멘트"
            description="코멘트"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
