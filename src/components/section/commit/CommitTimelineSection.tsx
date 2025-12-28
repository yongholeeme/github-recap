import {useMemo} from 'react'

import {useTranslation} from 'react-i18next'

import BarChart from '@/components/commons/BarChart'
import InsightSection from '@/components/commons/InsightSection'
import {useYear} from '@/contexts/YearContext'
import {type SimplifiedCommit} from '@/libs/github/commits'
import {useCommits} from '@/libs/hooks/useCommits'

function calculateCommitsByMonth(commits: SimplifiedCommit[]) {
    const monthCounts: Record<number, number> = {}
    for (let i = 0; i < 12; i++) {
        monthCounts[i] = 0
    }

    for (const commit of commits) {
        const date = new Date(commit.committedDate)
        const month = date.getMonth()
        monthCounts[month] = (monthCounts[month] || 0) + 1
    }

    return monthCounts
}

function getMonthName(month: number, t: (key: string) => string): string {
    return t(`commit.timeline.months.${month}`)
}

function getTopMonths(monthCounts: Record<number, number>) {
    return Object.entries(monthCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
}

export default function CommitTimelineSection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data: commits, isFetching} = useCommits(year)

    const timelineData = useMemo(() => {
        if (!commits) {
            return null
        }
        const monthCounts = calculateCommitsByMonth(commits)
        const topMonths = getTopMonths(monthCounts)

        return {monthCounts, topMonths}
    }, [commits])

    const maxCount = timelineData ? Math.max(...Object.values(timelineData.monthCounts)) : 0
    const chartData = timelineData
        ? Object.entries(timelineData.monthCounts).map(([month, count]) => ({
              label: getMonthName(Number.parseInt(month), t),
              value: count,
              isPeak: count === maxCount,
          }))
        : Array.from({length: 12}, (_, i) => ({
              label: getMonthName(i, t),
              value: 0,
              isPeak: false,
          }))

    return (
        <InsightSection
            title={t('commit.timeline.title')}
            subtitle={t('commit.timeline.subtitle')}
            chart={<BarChart data={chartData} maxValue={maxCount} />}
            topItems={
                timelineData?.topMonths.map(([month, count]) => ({
                    label: getMonthName(Number.parseInt(month), t),
                    value: t('common.items', {count}),
                    rank: 0,
                })) || []
            }
            isFetching={isFetching}
        />
    )
}
