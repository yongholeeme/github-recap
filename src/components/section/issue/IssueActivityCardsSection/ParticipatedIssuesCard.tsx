import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedIssues} from '@/libs/hooks/useCountOfParticipatedIssues'

export default function ParticipatedIssuesCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfParticipatedIssues(year)

    return (
        <StatCard
            title={t('issue.cards.participatedIssues.title')}
            description={t('issue.cards.participatedIssues.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
