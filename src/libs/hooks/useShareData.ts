import {useMemo} from 'react'

import {useTranslation} from 'react-i18next'

import {useCommits} from './useCommits'
import {useCountOfCommits} from './useCountOfCommits'
import {useCountOfMentionsMe} from './useCountOfMentionsMe'
import {useCountOfMyCreatedPrs} from './useCountOfMyCreatedPrs'
import {useCountOfMyMergedPrs} from './useCountOfMyMergedPrs'
import {useCountOfParticipatedIssues} from './useCountOfParticipatedIssues'
import {useCountOfPrsReviewedByMe} from './useCountOfPrsReviewedByMe'

import {type ShareData, getDeveloperType} from '@/libs/share/generateShareImage'

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

        // Calculate peak hour
        let peakHour = 12
        if (commits && commits.length > 0) {
            const hourCounts: Record<number, number> = {}
            for (const commit of commits) {
                const hour = new Date(commit.committedDate).getHours()
                hourCounts[hour] = (hourCounts[hour] || 0) + 1
            }
            peakHour = Number(
                Object.entries(hourCounts).reduce((a, b) => (hourCounts[Number(a[0])] > hourCounts[Number(b[0])] ? a : b))[0]
            )
        }

        // Calculate peak day index for developer type
        let peakDayIndex = 1 // Default to Monday
        if (commits && commits.length > 0) {
            const dayCounts: Record<number, number> = {}
            for (const commit of commits) {
                const day = new Date(commit.committedDate).getDay()
                dayCounts[day] = (dayCounts[day] || 0) + 1
            }
            peakDayIndex = Number(
                Object.entries(dayCounts).reduce((a, b) => (dayCounts[Number(a[0])] > dayCounts[Number(b[0])] ? a : b))[0]
            )
        }

        // Calculate monthly commits
        const monthlyCommits: number[] = Array(12).fill(0)
        if (commits && commits.length > 0) {
            for (const commit of commits) {
                const month = new Date(commit.committedDate).getMonth()
                monthlyCommits[month]++
            }
        }

        // Get developer type
        const {typeKey: developerTypeKey, emoji: developerTypeEmoji} = getDeveloperType(
            peakHour,
            peakDayIndex,
            commitCount || 0,
            prsReviewed || 0
        )
        const developerType = t(`share.developerTypes.${developerTypeKey}`)

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
            developerType,
            developerTypeEmoji,
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
