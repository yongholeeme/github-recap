import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMostDiscussedDiscussion} from '@/libs/hooks/useMostDiscussedDiscussion'

export default function MostDiscussedDiscussionCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useMostDiscussedDiscussion(year)

    if (!data) {
        return (
            <StatCard
                title={t('issue.cards.mostDiscussedDiscussion.title')}
                value="-"
                description={t('issue.cards.mostDiscussedDiscussion.description')}
                isFetching={isFetching}
            />
        )
    }

    return (
        <StatCard
            title={t('issue.cards.mostDiscussedDiscussion.title')}
            value={t('common.comments', {count: data.comments})}
            description={data.title}
            link={data.url}
            isFetching={isFetching}
        />
    )
}
