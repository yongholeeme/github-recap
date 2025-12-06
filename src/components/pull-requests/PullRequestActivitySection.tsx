import ApprovedPullRequestsCard from '@/components/pull-requests/ApprovedPullRequestsCard'
import AverageMergeTimeCard from '@/components/pull-requests/AverageMergeTimeCard'
import ClosedNotMergedPullRequestsCard from '@/components/pull-requests/ClosedNotMergedPullRequestsCard'
import CreatedPullRequestsCard from '@/components/pull-requests/CreatedPullRequestsCard'
import FastestMergedPRCard from '@/components/pull-requests/FastestMergedPRCard'
import MergedPullRequestsCard from '@/components/pull-requests/MergedPullRequestsCard'
import MostDiscussedPRCard from '@/components/pull-requests/MostDiscussedPRCard'
import PullRequestReviewCommentsCard from '@/components/pull-requests/PullRequestReviewCommentsCard'
import PullRequestReviewsCard from '@/components/pull-requests/PullRequestReviewsCard'
import RequestedChangesPullRequestsCard from '@/components/pull-requests/RequestedChangesPullRequestsCard'
import SlowestMergedPRCard from '@/components/pull-requests/SlowestMergedPRCard'
import BackgroundGrid from '@/components/ui/BackgroundGrid'
import Grid from '@/components/ui/Grid'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionContent from '@/components/ui/SectionContent'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PullRequestActivitySection() {
    return (
        <SectionContainer>
            <BackgroundGrid />

            <SectionContent>
                <SectionHeader
                    title={
                        <>
                            함께 만드는
                            <br />더 나은 코드
                        </>
                    }
                    subtitle="Pull Request로 협업하고 성장합니다"
                    variant="large"
                    mb="xl"
                />

                <Grid cols={1} smCols={3} mb="md">
                    <CreatedPullRequestsCard />
                    <MergedPullRequestsCard />
                    <PullRequestReviewsCard />
                </Grid>

                <Grid cols={2} lgCols={4} mb="md">
                    <PullRequestReviewCommentsCard />
                    <ApprovedPullRequestsCard />
                    <RequestedChangesPullRequestsCard />
                    <ClosedNotMergedPullRequestsCard />
                </Grid>

                <Grid cols={1} smCols={2} lgCols={4}>
                    <MostDiscussedPRCard />
                    <AverageMergeTimeCard />
                    <FastestMergedPRCard />
                    <SlowestMergedPRCard />
                </Grid>
            </SectionContent>
        </SectionContainer>
    )
}
