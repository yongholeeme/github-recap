import {useTranslation} from 'react-i18next'

import RepositoryStatsSection from '@/components/commons/RepositoryStatsSection'
import {useYear} from '@/contexts/YearContext'
import {useRepositoryCommits} from '@/libs/hooks/useRepositoryCommits'

export default function RepositoryCommitsSection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useRepositoryCommits(year)

    const repos = data?.map((repo) => ({
        repo: repo.repo,
        owner: repo.username,
        count: repo.commitCount,
    }))

    return (
        <RepositoryStatsSection
            title={t('commit.repository.title', {year})}
            subtitle=""
            data={repos}
            isFetching={isFetching}
            countLabel={t('commit.repository.countLabel')}
            linkType="commits"
            colorScheme={{
                primary: '#3b82f6',
                secondary: '#06b6d4',
                accent: '#60a5fa',
            }}
        />
    )
}
