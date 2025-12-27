import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsRequestedChangeByMe} from '@/libs/hooks/useCountOfPrsRequestedChangeByMe'

export default function RequestedChangesPullRequestsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsRequestedChangeByMe(year)

    return (
        <StatCard
            title={t('pr.cards.requestedChanges.title')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
