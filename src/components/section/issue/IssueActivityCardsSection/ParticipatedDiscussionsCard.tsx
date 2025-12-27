import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedDiscussions} from '@/libs/hooks/useCountOfParticipatedDiscussions'

export default function ParticipatedDiscussionsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfParticipatedDiscussions(year)

    return (
        <StatCard
            title={t('issue.cards.participatedDiscussions.title')}
            description={t('issue.cards.participatedDiscussions.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
