import {useMemo} from 'react'

import {useTranslation} from 'react-i18next'

import {useCommits} from './useCommits'
import {useCountOfCommits} from './useCountOfCommits'
import {useCountOfMentionsMe} from './useCountOfMentionsMe'
import {useCountOfMyCreatedPrs} from './useCountOfMyCreatedPrs'
import {useCountOfMyMergedPrs} from './useCountOfMyMergedPrs'
import {useCountOfParticipatedIssues} from './useCountOfParticipatedIssues'
import {useCountOfPrsReviewedByMe} from './useCountOfPrsReviewedByMe'

import {type ShareData} from '@/libs/share/generateShareImage'

interface UseShareDataParams {
    year: number
    userName: string
    avatarUrl: string
}

export function useShareData({year, userName, avatarUrl}: UseShareDataParams) {
    const {t} = useTranslation()

    const {data: commits} = useCommits(year)
    const {data: commitCount} = useCountOfCommits(year)
    const {data: prsCreated} = useCountOfMyCreatedPrs(year)
    const {data: prsMerged} = useCountOfMyMergedPrs(year)
    const {data: prsReviewed} = useCountOfPrsReviewedByMe(year)
    const {data: issuesParticipated} = useCountOfParticipatedIssues(year)
    const {data: mentions} = useCountOfMentionsMe(year)

    const shareData = useMemo<ShareData | null>(() => {
        if (commitCount === undefined) {
            return null
        }

        // Calculate monthly commits
        const monthlyCommits: number[] = Array(12).fill(0)
        if (commits && commits.length > 0) {
            for (const commit of commits) {
                const month = new Date(commit.committedDate).getMonth()
                monthlyCommits[month]++
            }
        }

        return {
            year,
            userName,
            avatarUrl,
            commits: commitCount || 0,
            prsCreated: prsCreated || 0,
            prsMerged: prsMerged || 0,
            prsReviewed: prsReviewed || 0,
            issuesParticipated: issuesParticipated || 0,
            mentions: mentions || 0,
            monthlyCommits,
            labels: {
                commits: t('share.image.commits'),
                prsCreated: t('share.image.prsCreated'),
                prsMerged: t('share.image.prsMerged'),
                reviews: t('share.image.reviews'),
                issues: t('share.image.issues'),
                mentions: t('share.image.mentions'),
            },
        }
    }, [
        year,
        userName,
        avatarUrl,
        commits,
        commitCount,
        prsCreated,
        prsMerged,
        prsReviewed,
        issuesParticipated,
        mentions,
        t,
    ])

    const isLoading =
        commitCount === undefined ||
        prsCreated === undefined ||
        prsMerged === undefined ||
        prsReviewed === undefined ||
        issuesParticipated === undefined

    return {
        data: shareData,
        isLoading,
    }
}
