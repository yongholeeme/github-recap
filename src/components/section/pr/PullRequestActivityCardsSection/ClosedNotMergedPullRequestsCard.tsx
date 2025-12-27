import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMyClosedPrsNotMerged} from '@/libs/hooks/useCountOfMyClosedPrsNotMerged'

export default function ClosedNotMergedPullRequestsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfMyClosedPrsNotMerged(year)

    return (
        <StatCard
            title={t('pr.cards.closed.title')}
            description={t('pr.cards.closed.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
