import Grid from '@/components/commons/Grid'
import Section from '@/components/commons/Section'
import DiscussionCommentsCard from '@/components/section/issue/IssueActivityCardsSection/DiscussionCommentsCard'
import IssueCommentsCard from '@/components/section/issue/IssueActivityCardsSection/IssueCommentsCard'
import MostDiscussedDiscussionCard from '@/components/section/issue/IssueActivityCardsSection/MostDiscussedDiscussionCard'
import MostDiscussedIssueCard from '@/components/section/issue/IssueActivityCardsSection/MostDiscussedIssueCard'
import ParticipatedDiscussionsCard from '@/components/section/issue/IssueActivityCardsSection/ParticipatedDiscussionsCard'
import ParticipatedIssuesCard from '@/components/section/issue/IssueActivityCardsSection/ParticipatedIssuesCard'

export default function IssueActivityCardsSection() {
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
