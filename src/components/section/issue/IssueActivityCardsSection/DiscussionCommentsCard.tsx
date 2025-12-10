import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfDiscussionComments} from '@/libs/hooks/useCountOfDiscussionComments'

export default function DiscussionCommentsCard() {
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfDiscussionComments(year)

    return (
        <StatCard
            title="디스커션 코멘트"
            description="코멘트"
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
