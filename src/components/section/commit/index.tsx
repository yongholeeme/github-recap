import CommitActivitySection from '@/components/section/commit/CommitActivitySection'
import CommitsByDaySection from '@/components/section/commit/CommitsByDaySection'
import CommitsByHourSection from '@/components/section/commit/CommitsByHourSection'
import CommitTimelineSection from '@/components/section/commit/CommitTimelineSection'
import RepositoryCommitsSection from '@/components/section/commit/RepositoryCommitsSection'

export default function CommitSections() {
    return (
        <div className="bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950">
            <CommitActivitySection />
            <CommitsByHourSection />
            <CommitsByDaySection />
            <CommitTimelineSection />
            <RepositoryCommitsSection />
        </div>
    )
}
