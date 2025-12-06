import BackgroundGrid from '@/components/common/BackgroundGrid'
import Grid from '@/components/common/Grid'
import SectionContainer from '@/components/common/SectionContainer'
import SectionContent from '@/components/common/SectionContent'
import SectionHeader from '@/components/common/SectionHeader'
import DiscussionCommentsCard from '@/components/issues/DiscussionCommentsCard'
import IssueCommentsCard from '@/components/issues/IssueCommentsCard'
import MostDiscussedDiscussionCard from '@/components/issues/MostDiscussedDiscussionCard'
import MostDiscussedIssueCard from '@/components/issues/MostDiscussedIssueCard'
import ParticipatedDiscussionsCard from '@/components/issues/ParticipatedDiscussionsCard'
import ParticipatedIssuesCard from '@/components/issues/ParticipatedIssuesCard'

export default function IssueActivitySection() {
    return (
        <SectionContainer>
            <BackgroundGrid />

            <SectionContent>
                <SectionHeader
                    title={
                        <>
                            문제를 찾고
                            <br />
                            해결합니다
                        </>
                    }
                    subtitle="이슈와 토론으로 함께 성장하는 커뮤니티"
                    variant="large"
                    className="mb-16 sm:mb-20"
                />

                <Grid cols={2} lgCols={4} className="mb-8">
                    <ParticipatedIssuesCard />
                    <IssueCommentsCard />
                    <ParticipatedDiscussionsCard />
                    <DiscussionCommentsCard />
                </Grid>

                <Grid cols={1} smCols={2}>
                    <MostDiscussedIssueCard />
                    <MostDiscussedDiscussionCard />
                </Grid>
            </SectionContent>
        </SectionContainer>
    )
}
