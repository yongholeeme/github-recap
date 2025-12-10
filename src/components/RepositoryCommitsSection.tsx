import RepositoryStatsSection from '@/components/ui/RepositoryStatsSection'
import {useYear} from '@/contexts/YearContext'
import {useRepositoryCommits} from '@/lib/hooks/useRepositoryCommits'

export default function RepositoryCommitsSection() {
    const {year} = useYear()
    const {data, isFetching} = useRepositoryCommits(year)

    const repos = data?.map((repo) => ({
        repo: repo.repo,
        owner: repo.username,
        count: repo.commitCount,
    }))

    return (
        <RepositoryStatsSection
            title="2025년의 코드들이 모인 곳"
            subtitle=""
            data={repos}
            isFetching={isFetching}
            countLabel="커밋"
            linkType="commits"
            colorScheme={{
                primary: '#3b82f6',
                secondary: '#06b6d4',
                accent: '#60a5fa',
            }}
        />
    )
}
