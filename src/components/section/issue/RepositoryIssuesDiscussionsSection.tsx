import {useTranslation} from 'react-i18next'

import RepositoryStatsSection from '@/components/commons/RepositoryStatsSection'
import {useYear} from '@/contexts/YearContext'
import {useRepositoryIssuesDiscussions} from '@/libs/hooks/useRepositoryIssuesDiscussions'

export default function RepositoryIssuesDiscussionsSection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useRepositoryIssuesDiscussions(year)

    const repos = data?.map((repo) => ({
        repo: repo.repo,
        owner: repo.username,
        count: repo.totalCount,
    }))

    return (
        <RepositoryStatsSection
            title={t('issue.repository.title')}
            subtitle={t('issue.repository.subtitle')}
            data={repos}
            isFetching={isFetching}
            countLabel={t('issue.repository.countLabel')}
            linkType="issues"
            colorScheme={{
                primary: '#10b981',
                secondary: '#14b8a6',
                accent: '#34d399',
            }}
        />
    )
}
