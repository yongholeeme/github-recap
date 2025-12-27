import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfDiscussionComments} from '@/libs/hooks/useCountOfDiscussionComments'

export default function DiscussionCommentsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfDiscussionComments(year)

    return (
        <StatCard
            title={t('issue.cards.discussionComments.title')}
            description={t('issue.cards.discussionComments.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
