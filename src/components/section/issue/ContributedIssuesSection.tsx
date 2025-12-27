import {useTranslation} from 'react-i18next'

import BigNumberSection from '@/components/commons/BigNumberSection'
import {useYear} from '@/contexts/YearContext'
import {useCountOfParticipatedDiscussions} from '@/libs/hooks/useCountOfParticipatedDiscussions'
import {useCountOfParticipatedIssues} from '@/libs/hooks/useCountOfParticipatedIssues'

export default function ContributedIssuesSection() {
    const {t} = useTranslation()
    const {year} = useYear()

    const {data: issuesCount, isFetching: isFetchingIssues} = useCountOfParticipatedIssues(year)
    const {data: discussionsCount, isFetching: isFetchingDiscussions} = useCountOfParticipatedDiscussions(year)

    // Calculate total participated issues and discussions
    const contributedCount = (issuesCount || 0) + (discussionsCount || 0)

    return (
        <BigNumberSection
            value={contributedCount}
            isFetching={isFetchingIssues || isFetchingDiscussions}
            title={t('issue.contributed.title')}
            subtitle={t('issue.contributed.subtitle')}
        />
    )
}
