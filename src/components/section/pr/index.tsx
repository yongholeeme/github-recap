import ContributedPullRequestsSection from '@/components/section/pr/ContributedPullRequestsSection'
import PullRequestActivityCardsSection from '@/components/section/pr/PullRequestActivityCardsSection'

export default function PrSections() {
    return (
        <div className="bg-gradient-to-br from-orange-950 via-amber-950 to-orange-950">
            <ContributedPullRequestsSection />
            <PullRequestActivityCardsSection />
        </div>
    )
}
