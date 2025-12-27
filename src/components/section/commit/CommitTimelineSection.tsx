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

function getMonthName(month: number, t: (key: string, options?: {month?: number}) => string): string {
    return t('commit.timeline.month', {month: month + 1})
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
        const totalCommits = Object.values(monthCounts).reduce((a, b) => a + b, 0)
        const activeMonths = Object.values(monthCounts).filter((c) => c > 0).length
        const avgPerMonth = Math.round(totalCommits / activeMonths)

        return {monthCounts, topMonths, totalCommits, activeMonths, avgPerMonth}
    }, [commits])

    const maxMonth = timelineData?.topMonths[0]
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
            chart={<BarChart data={chartData} maxValue={maxCount} height={320} barHeight={280} />}
            topItems={
                timelineData?.topMonths.map(([month, count]) => ({
                    label: getMonthName(Number.parseInt(month), t),
                    value: t('common.items', {count}),
                    rank: 0,
                })) || []
            }
            stats={[
                {label: t('commit.timeline.activeMonths'), value: timelineData ? `${timelineData.activeMonths}/12` : '-'},
                {label: t('commit.timeline.avgPerMonth'), value: timelineData?.avgPerMonth || '-'},
                {label: t('commit.timeline.bestRecord'), value: maxMonth ? t('common.items', {count: maxMonth[1]}) : '-'},
            ]}
            isFetching={isFetching}
        />
    )
}
