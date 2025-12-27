import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMyCreatedPrs} from '@/libs/hooks/useCountOfMyCreatedPrs'

export default function CreatedPullRequestsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfMyCreatedPrs(year)

    return (
        <StatCard
            title={t('pr.cards.created.title')}
            description={t('pr.cards.created.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
