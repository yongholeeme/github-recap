import ApprovedPullRequestsCard from '@/components/ApprovedPullRequestsCard'
import AverageMergeTimeCard from '@/components/AverageMergeTimeCard'
import ClosedNotMergedPullRequestsCard from '@/components/ClosedNotMergedPullRequestsCard'
import CreatedPullRequestsCard from '@/components/CreatedPullRequestsCard'
import FastestMergedPRCard from '@/components/FastestMergedPRCard'
import MergedPullRequestsCard from '@/components/MergedPullRequestsCard'
import MostDiscussedPRCard from '@/components/MostDiscussedPRCard'
import PullRequestReviewCommentsCard from '@/components/PullRequestReviewCommentsCard'
import PullRequestReviewsCard from '@/components/PullRequestReviewsCard'
import RequestedChangesPullRequestsCard from '@/components/RequestedChangesPullRequestsCard'
import SlowestMergedPRCard from '@/components/SlowestMergedPRCard'
import Grid from '@/components/ui/Grid'
import Section from '@/components/ui/Section'

export default function PullRequestActivitySection() {
    return (
        <Section
            title={
                <>
                    함께 만드는
                    <br />더 나은 코드
                </>
            }
            subtitle="Pull Request로 협업하고 성장합니다"
        >
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
        </Section>
    )
}
