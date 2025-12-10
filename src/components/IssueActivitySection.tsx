import DiscussionCommentsCard from '@/components/DiscussionCommentsCard'
import IssueCommentsCard from '@/components/IssueCommentsCard'
import MostDiscussedDiscussionCard from '@/components/MostDiscussedDiscussionCard'
import MostDiscussedIssueCard from '@/components/MostDiscussedIssueCard'
import ParticipatedDiscussionsCard from '@/components/ParticipatedDiscussionsCard'
import ParticipatedIssuesCard from '@/components/ParticipatedIssuesCard'
import Grid from '@/components/ui/Grid'
import Section from '@/components/ui/Section'

export default function IssueActivitySection() {
    return (
        <Section
            title={
                <>
                    문제를 찾고
                    <br />
                    해결합니다
                </>
            }
            subtitle="이슈와 토론으로 함께 성장하는 커뮤니티"
        >
            <Grid cols={2} lgCols={4} mb="md">
                <ParticipatedIssuesCard />
                <IssueCommentsCard />
                <ParticipatedDiscussionsCard />
                <DiscussionCommentsCard />
            </Grid>

            <Grid cols={1} smCols={2}>
                <MostDiscussedIssueCard />
                <MostDiscussedDiscussionCard />
            </Grid>
        </Section>
    )
}
