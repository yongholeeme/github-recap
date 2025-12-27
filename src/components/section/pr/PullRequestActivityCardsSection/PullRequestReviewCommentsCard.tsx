import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfCommentsByMeToPr} from '@/libs/hooks/useCountOfCommentsByMeToPr'

export default function PullRequestReviewCommentsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfCommentsByMeToPr(year)

    return (
        <StatCard
            title={t('pr.cards.reviewComments.title')}
            description={t('pr.cards.reviewComments.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
