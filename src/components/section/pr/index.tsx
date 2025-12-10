import SectionGroup from '@/components/commons/SectionGroup'
import ContributedPullRequestsSection from '@/components/section/pr/ContributedPullRequestsSection'
import PullRequestActivityCardsSection from '@/components/section/pr/PullRequestActivityCardsSection'

export default function PrSections() {
    return (
        <SectionGroup gradient="orange">
            <ContributedPullRequestsSection />
            <PullRequestActivityCardsSection />
        </SectionGroup>
    )
}
