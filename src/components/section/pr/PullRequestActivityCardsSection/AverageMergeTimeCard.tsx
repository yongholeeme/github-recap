import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMyAverageMergeTime} from '@/libs/hooks/useMyMergedPrs'

export default function AverageMergeTimeCard() {
    const {year} = useYear()
    const {data, isFetching} = useMyAverageMergeTime(year)

    if (data === null || data === undefined) {
        return <StatCard title="PR 평균 머지 속도" value="-" description="생성부터 머지까지" isFetching={isFetching} />
    }

    const formatTime = (hours: number) => {
        if (hours < 1) {
            return `${Math.round(hours * 60)}분`
        } else if (hours < 24) {
            return `${Math.round(hours)}시간`
        } else {
            const days = Math.floor(hours / 24)
            const remainingHours = Math.round(hours % 24)
            return remainingHours > 0 ? `${days}일 ${remainingHours}시간` : `${days}일`
        }
    }

    return (
        <StatCard
            title="PR 평균 머지 속도"
            value={formatTime(data)}
            description="생성부터 머지까지"
            isFetching={isFetching}
        />
    )
}
