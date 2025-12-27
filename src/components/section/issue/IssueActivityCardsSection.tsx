import {useTranslation} from 'react-i18next'

import Grid from '@/components/commons/Grid'
import Section from '@/components/commons/Section'
import DiscussionCommentsCard from '@/components/section/issue/IssueActivityCardsSection/DiscussionCommentsCard'
import IssueCommentsCard from '@/components/section/issue/IssueActivityCardsSection/IssueCommentsCard'
import MostDiscussedDiscussionCard from '@/components/section/issue/IssueActivityCardsSection/MostDiscussedDiscussionCard'
import MostDiscussedIssueCard from '@/components/section/issue/IssueActivityCardsSection/MostDiscussedIssueCard'
import ParticipatedDiscussionsCard from '@/components/section/issue/IssueActivityCardsSection/ParticipatedDiscussionsCard'
import ParticipatedIssuesCard from '@/components/section/issue/IssueActivityCardsSection/ParticipatedIssuesCard'

export default function IssueActivityCardsSection() {
    const {t} = useTranslation()

    return (
        <Section
            title={
                <>
                    {t('issue.activity.title')}
                    <br />
                    {t('issue.activity.title2')}
                </>
            }
            subtitle={t('issue.activity.subtitle')}
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
