import {useMemo} from 'react'

import {useTranslation} from 'react-i18next'

import BarChart from '@/components/commons/BarChart'
import InsightSection from '@/components/commons/InsightSection'
import {useYear} from '@/contexts/YearContext'
import {type SimplifiedCommit} from '@/libs/github/commits'
import {useCommits} from '@/libs/hooks/useCommits'

function calculateCommitsByDay(commits: SimplifiedCommit[]) {
    const dayCounts: Record<number, number> = {}
    for (let i = 0; i < 7; i++) {
        dayCounts[i] = 0
    }

    for (const commit of commits) {
        const date = new Date(commit.committedDate)
        const day = date.getDay()
        dayCounts[day] = (dayCounts[day] || 0) + 1
    }

    return dayCounts
}

function getDayName(day: number, t: (key: string) => string): string {
    const days = [
        t('commit.byDay.days.0'),
        t('commit.byDay.days.1'),
        t('commit.byDay.days.2'),
        t('commit.byDay.days.3'),
        t('commit.byDay.days.4'),
        t('commit.byDay.days.5'),
        t('commit.byDay.days.6'),
    ]
    return days[day]
}

function getTopDays(dayCounts: Record<number, number>) {
    return Object.entries(dayCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
}

export default function CommitsByDaySection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data: commits, isFetching} = useCommits(year)

    const dayData = useMemo(() => {
        if (!commits) {
            return null
        }
        const dayCounts = calculateCommitsByDay(commits)
        const topDays = getTopDays(dayCounts)

        return {dayCounts, topDays}
    }, [commits])

    const maxCount = dayData ? Math.max(...Object.values(dayData.dayCounts)) : 0
    const chartData = dayData
        ? Object.entries(dayData.dayCounts).map(([day, count]) => ({
              label: getDayName(Number.parseInt(day), t),
              value: count,
              isPeak: count === maxCount,
          }))
        : Array.from({length: 7}, (_, i) => ({
              label: getDayName(i, t),
              value: 0,
              isPeak: false,
          }))

    return (
        <InsightSection
            title={t('commit.byDay.title')}
            subtitle={t('commit.byDay.subtitle')}
            chart={<BarChart data={chartData} maxValue={maxCount} />}
            topItems={
                dayData?.topDays.map(([day, count]) => ({
                    label: t('commit.byDay.dayFormat', {day: getDayName(Number.parseInt(day), t)}),
                    value: t('common.items', {count}),
                    rank: 0,
                })) || []
            }
            isFetching={isFetching}
        />
    )
}
