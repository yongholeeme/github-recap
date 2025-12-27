import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMyMergedPrs} from '@/libs/hooks/useCountOfMyMergedPrs'

export default function MergedPullRequestsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfMyMergedPrs(year)

    return (
        <StatCard
            title={t('pr.cards.merged.title')}
            description={t('pr.cards.merged.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
