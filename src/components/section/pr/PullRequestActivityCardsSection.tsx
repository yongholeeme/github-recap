import {useTranslation} from 'react-i18next'

import Grid from '@/components/commons/Grid'
import Section from '@/components/commons/Section'
import ApprovedPullRequestsCard from '@/components/section/pr/PullRequestActivityCardsSection/ApprovedPullRequestsCard'
import AverageMergeTimeCard from '@/components/section/pr/PullRequestActivityCardsSection/AverageMergeTimeCard'
import ClosedNotMergedPullRequestsCard from '@/components/section/pr/PullRequestActivityCardsSection/ClosedNotMergedPullRequestsCard'
import CreatedPullRequestsCard from '@/components/section/pr/PullRequestActivityCardsSection/CreatedPullRequestsCard'
import FastestMergedPRCard from '@/components/section/pr/PullRequestActivityCardsSection/FastestMergedPRCard'
import MergedPullRequestsCard from '@/components/section/pr/PullRequestActivityCardsSection/MergedPullRequestsCard'
import MostDiscussedPRCard from '@/components/section/pr/PullRequestActivityCardsSection/MostDiscussedPRCard'
import PullRequestReviewCommentsCard from '@/components/section/pr/PullRequestActivityCardsSection/PullRequestReviewCommentsCard'
import PullRequestReviewsCard from '@/components/section/pr/PullRequestActivityCardsSection/PullRequestReviewsCard'
import RequestedChangesPullRequestsCard from '@/components/section/pr/PullRequestActivityCardsSection/RequestedChangesPullRequestsCard'
import SlowestMergedPRCard from '@/components/section/pr/PullRequestActivityCardsSection/SlowestMergedPRCard'

export default function PullRequestActivityCardsSection() {
    const {t} = useTranslation()

    return (
        <Section
            title={
                <>
                    {t('pr.activity.title')}
                    <br />
                    {t('pr.activity.title2')}
                </>
            }
            subtitle={t('pr.activity.subtitle')}
        >
            {/* 주요 지표 */}
            <Grid cols={2} smCols={3} mb="md">
                <CreatedPullRequestsCard />
                <MergedPullRequestsCard />
                <ClosedNotMergedPullRequestsCard />
            </Grid>

            {/* 리뷰 활동 */}
            <Grid cols={2} lgCols={4} mb="md">
                <PullRequestReviewsCard />
                <PullRequestReviewCommentsCard />
                <ApprovedPullRequestsCard />
                <RequestedChangesPullRequestsCard />
            </Grid>

            {/* 머지 시간 & 하이라이트 */}
            <Grid cols={2} lgCols={4}>
                <AverageMergeTimeCard />
                <FastestMergedPRCard />
                <SlowestMergedPRCard />
                <MostDiscussedPRCard />
            </Grid>
        </Section>
    )
}
