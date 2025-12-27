import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfIssueComments} from '@/libs/hooks/useCountOfIssueComments'

export default function IssueCommentsCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching, error} = useCountOfIssueComments(year)

    return (
        <StatCard
            title={t('issue.cards.issueComments.title')}
            description={t('issue.cards.issueComments.description')}
            value={data as number | undefined}
            isFetching={isFetching}
            error={error}
        />
    )
}
