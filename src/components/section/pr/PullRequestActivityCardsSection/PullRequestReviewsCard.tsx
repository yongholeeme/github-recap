import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfPrsReviewedByMe} from '@/libs/hooks/useCountOfPrsReviewedByMe'

export default function PullRequestReviewsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfPrsReviewedByMe(year)

    return (
        <StatCard
            title={t('pr.cards.reviews.title')}
            description={t('pr.cards.reviews.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
