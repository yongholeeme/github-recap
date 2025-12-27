import {useMemo} from 'react'

import {useTranslation} from 'react-i18next'

import BarChart from '@/components/commons/BarChart'
import InsightSection from '@/components/commons/InsightSection'
import {useYear} from '@/contexts/YearContext'
import {type SimplifiedCommit} from '@/libs/github/commits'
import {useCommits} from '@/libs/hooks/useCommits'

function calculateCommitsByHour(commits: SimplifiedCommit[]) {
    const hourCounts: Record<number, number> = {}
    for (let i = 0; i < 24; i++) {
        hourCounts[i] = 0
    }

    for (const commit of commits) {
        const date = new Date(commit.committedDate)
        const hour = date.getHours()
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
    }

    return hourCounts
}

function getPeakHours(hourCounts: Record<number, number>) {
    const sortedHours = Object.entries(hourCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)

    return sortedHours
}

export default function CommitsByHourSection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data: commits, isFetching} = useCommits(year)

    const hourData = useMemo(() => {
        if (!commits) {
            return null
        }
        const hourCounts = calculateCommitsByHour(commits)
        const peakHours = getPeakHours(hourCounts)
        const maxCount = Math.max(...Object.values(hourCounts))
        const totalCommits = Object.values(hourCounts).reduce((a, b) => a + b, 0)
        const activeHours = Object.values(hourCounts).filter((c) => c > 0).length
        const avgPerHour = Math.round(totalCommits / activeHours)

        return {hourCounts, peakHours, maxCount, avgPerHour}
    }, [commits])

    const peakHourNums = hourData?.peakHours.map(([h]) => Number.parseInt(h)) || []
    const chartData = hourData
        ? Object.entries(hourData.hourCounts).map(([hour, count]) => ({
              label: Number.parseInt(hour),
              value: count,
              isPeak: peakHourNums.includes(Number.parseInt(hour)),
          }))
        : Array.from({length: 24}, (_, i) => ({
              label: i,
              value: 0,
              isPeak: false,
          }))

    return (
        <InsightSection
            title={t('commit.byHour.title')}
            subtitle={t('commit.byHour.subtitle')}
            chart={<BarChart data={chartData} maxValue={hourData?.maxCount || 0} />}
            topItems={
                hourData?.peakHours.map(([hour, count]) => ({
                    label: t('commit.byHour.hour', {hour}),
                    value: t('common.items', {count}),
                    rank: 0,
                })) || []
            }
            stats={[
                {label: t('commit.byHour.maxCommits'), value: hourData?.maxCount || '-'},
                {label: t('commit.byHour.avgCommits'), value: hourData?.avgPerHour || '-'},
            ]}
            isFetching={isFetching}
        />
    )
}
