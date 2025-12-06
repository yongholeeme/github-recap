import StatCard from '@/components/ui/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMostDiscussedPR} from '@/lib/hooks/useMostDiscussedPR'

export default function MostDiscussedPRCard() {
    const {year} = useYear()
    const {data, isFetching} = useMostDiscussedPR(year)
    console.log(data)

    if (!data) {
        return <StatCard title="가장 치열했던 PR" value="-" description="코멘트 수 기준" isFetching={isFetching} />
    }

    return (
        <StatCard
            title="가장 치열했던 PR"
            value={`${data.comments}개의 댓글`}
            description={data.title}
            link={data.url}
            isFetching={isFetching}
        />
    )
}
