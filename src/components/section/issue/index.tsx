import ContributedIssuesSection from '@/components/section/issue/ContributedIssuesSection'
import IssueActivityCardsSection from '@/components/section/issue/IssueActivityCardsSection'
import RepositoryIssuesDiscussionsSection from '@/components/section/issue/RepositoryIssuesDiscussionsSection'

export default function IssueSections() {
    return (
        <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-950">
            <ContributedIssuesSection />
            <IssueActivityCardsSection />
            <RepositoryIssuesDiscussionsSection />
        </div>
    )
}
