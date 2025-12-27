import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMostDiscussedIssue} from '@/libs/hooks/useMostDiscussedIssue'

export default function MostDiscussedIssueCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useMostDiscussedIssue(year)

    if (!data) {
        return (
            <StatCard
                title={t('issue.cards.mostDiscussedIssue.title')}
                value="-"
                description={t('issue.cards.mostDiscussedIssue.description')}
                isFetching={isFetching}
            />
        )
    }

    return (
        <StatCard
            title={t('issue.cards.mostDiscussedIssue.title')}
            value={t('common.comments', {count: data.comments})}
            description={data.title}
            link={data.url}
            isFetching={isFetching}
        />
    )
}
