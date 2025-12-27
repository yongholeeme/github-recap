import SectionGroup from '@/components/commons/SectionGroup'
import CommitActivitySection from '@/components/section/commit/CommitActivitySection'
import CommitsByDaySection from '@/components/section/commit/CommitsByDaySection'
import CommitsByHourSection from '@/components/section/commit/CommitsByHourSection'
import CommitTimelineSection from '@/components/section/commit/CommitTimelineSection'
import RepositoryCommitsSection from '@/components/section/commit/RepositoryCommitsSection'

export default function CommitSections() {
    return (
        <SectionGroup gradient="blue">
            <CommitActivitySection />
            <CommitTimelineSection />
            <CommitsByDaySection />
            <CommitsByHourSection />
            <RepositoryCommitsSection />
        </SectionGroup>
    )
}
