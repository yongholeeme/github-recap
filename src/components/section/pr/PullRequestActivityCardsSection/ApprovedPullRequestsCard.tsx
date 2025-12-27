import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsApprovedByMe} from '@/libs/hooks/useCountOfPrsApprovedByMe'

export default function ApprovedPullRequestsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsApprovedByMe(year)

    return (
        <StatCard
            title={t('pr.cards.approved.title')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
