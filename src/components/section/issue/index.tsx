import SectionGroup from '@/components/commons/SectionGroup'
import ContributedIssuesSection from '@/components/section/issue/ContributedIssuesSection'
import IssueActivityCardsSection from '@/components/section/issue/IssueActivityCardsSection'
import RepositoryIssuesDiscussionsSection from '@/components/section/issue/RepositoryIssuesDiscussionsSection'

export default function IssueSections() {
    return (
        <SectionGroup gradient="emerald">
            <ContributedIssuesSection />
            <IssueActivityCardsSection />
            <RepositoryIssuesDiscussionsSection />
        </SectionGroup>
    )
}
