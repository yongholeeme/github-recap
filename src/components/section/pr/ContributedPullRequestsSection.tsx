import BigNumberSection from '@/components/commons/BigNumberSection'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedPrs} from '@/libs/hooks/useCountOfParticipatedPrs'

export default function ContributedPullRequestsSection() {
    const {year} = useYear()

    const {data: participatedCount, isFetching: isFetchingParticipated} = useCountOfParticipatedPrs(year)

    return (
        <BigNumberSection
            value={participatedCount}
            isFetching={isFetchingParticipated}
            title="기여한 Pull Request"
            subtitle="참여한 PR의 개수"
        />
    )
}
