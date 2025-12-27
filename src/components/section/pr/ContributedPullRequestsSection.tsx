import {useTranslation} from 'react-i18next'

import BigNumberSection from '@/components/commons/BigNumberSection'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedPrs} from '@/libs/hooks/useCountOfParticipatedPrs'

export default function ContributedPullRequestsSection() {
    const {t} = useTranslation()
    const {year} = useYear()

    const {data: participatedCount, isFetching: isFetchingParticipated} = useCountOfParticipatedPrs(year)

    return (
        <BigNumberSection
            value={participatedCount}
            isFetching={isFetchingParticipated}
            title={t('pr.contributed.title')}
            subtitle={t('pr.contributed.subtitle')}
        />
    )
}
