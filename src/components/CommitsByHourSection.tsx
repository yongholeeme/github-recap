import {useMemo, useState, useEffect} from 'react'

import {useInView} from 'react-intersection-observer'

import BarChart from '@/components/charts/BarChart'
import InsightSection from '@/components/InsightSection'
import Toast from '@/components/Toast'
import {useYear} from '@/contexts/YearContext'
import {type SimplifiedCommit} from '@/lib/github/commits'
import {useCommits} from '@/lib/hooks/useCommits'

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

function getTimeRangeRecommendation(peakHours: [string, number][]) {
    if (peakHours.length === 0) {
        return null
    }

    const topHour = Number.parseInt(peakHours[0][0])

    // 시간대별 추천 메시지
    if (topHour >= 6 && topHour < 12) {
        return {
            period: '아침',
            emoji: '🌅',
            message: '아침형 개발자시네요! 상쾌한 아침 시간을 활용하세요',
            time: `${topHour}시-${topHour + 3}시`,
        }
    }
    if (topHour >= 12 && topHour < 18) {
        return {
            period: '오후',
            emoji: '☀️',
            message: '오후에 집중력이 최고조! 점심 이후 시간을 활용하세요',
            time: `${topHour}시-${topHour + 3}시`,
        }
    }
    if (topHour >= 18 && topHour < 24) {
        return {
            period: '저녁',
            emoji: '🌙',
            message: '야행성 개발자! 저녁에 가장 생산적입니다',
            time: `${topHour}시-${(topHour + 3) % 24}시`,
        }
    }
    return {
        period: '새벽',
        emoji: '🦉',
        message: '진정한 밤의 코더! 고요한 새벽이 당신의 시간입니다',
        time: `${topHour}시-${topHour + 3}시`,
    }
}

export default function CommitsByHourSection() {
    const {year} = useYear()
    const {data: commits, isFetching} = useCommits(year)
    const [isDismissed, setIsDismissed] = useState(false)

    const {ref, inView} = useInView({
        threshold: 0.5,
        triggerOnce: false,
    })

    const hourData = useMemo(() => {
        if (!commits) {
            return null
        }
        const hourCounts = calculateCommitsByHour(commits)
        const peakHours = getPeakHours(hourCounts)
        const recommendation = getTimeRangeRecommendation(peakHours)
        const maxCount = Math.max(...Object.values(hourCounts))
        const totalCommits = Object.values(hourCounts).reduce((a, b) => a + b, 0)
        const activeHours = Object.values(hourCounts).filter((c) => c > 0).length
        const avgPerHour = Math.round(totalCommits / activeHours)

        return {hourCounts, peakHours, recommendation, maxCount, avgPerHour}
    }, [commits])

    // Derive toast visibility from props (no state updates in effects)
    const showToast = Boolean(hourData?.recommendation && inView && !isDismissed)

    // Auto-dismiss toast after 5 seconds
    useEffect(() => {
        if (!showToast) {
            return
        }

        const dismissTimer = setTimeout(() => {
            setIsDismissed(true)
        }, 5000)

        return () => {
            clearTimeout(dismissTimer)
        }
    }, [showToast])

    // Reset dismissed state when leaving view (using queueMicrotask to avoid sync setState)
    useEffect(() => {
        if (!inView && isDismissed) {
            queueMicrotask(() => {
                setIsDismissed(false)
            })
        }
    }, [inView, isDismissed])

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
        <div ref={ref} className="relative">
            {/* Toast for recommendation */}
            {hourData?.recommendation && (
                <Toast isVisible={showToast} onClose={() => setIsDismissed(true)}>
                    <div className="text-3xl flex-shrink-0">{hourData.recommendation.emoji}</div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                                인사이트
                            </span>
                            <span className="ml-auto px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[10px] text-white/90 font-bold">
                                {hourData.recommendation.period} 타입
                            </span>
                        </div>
                        <h4 className="text-base font-black text-white mb-1">{hourData.recommendation.time}</h4>
                        <p className="text-xs text-white/70 font-medium line-clamp-2">
                            {hourData.recommendation.message}
                        </p>
                    </div>
                </Toast>
            )}

            <InsightSection
                title="24시간의 흔적"
                subtitle="하루 중 언제 가장 몰입하시나요?"
                chart={<BarChart data={chartData} maxValue={hourData?.maxCount || 0} />}
                topItems={
                    hourData?.peakHours.map(([hour, count]) => ({
                        label: `${hour}시`,
                        value: `${count}개`,
                        rank: 0,
                    })) || []
                }
                stats={[
                    {label: '최다 커밋', value: hourData?.maxCount || '-'},
                    {label: '평균 커밋', value: hourData?.avgPerHour || '-'},
                ]}
                isFetching={isFetching}
            />
        </div>
    )
}
