import type {ReactNode} from 'react'

import BackgroundGrid from '@/components/ui/BackgroundGrid'
import Grid from '@/components/ui/Grid'
import LoadingOverlay from '@/components/ui/LoadingOverlay'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionContent from '@/components/ui/SectionContent'
import SectionHeader from '@/components/ui/SectionHeader'

interface InsightSectionProps {
    title: string
    subtitle: string
    chart: ReactNode
    topItems?: {
        label: string
        value: string | number
        rank: number
    }[]
    stats?: {
        label: string
        value: string | number
    }[]
    isFetching?: boolean
}

const MEDALS = ['🥇', '🥈', '🥉']
const RANK_COLORS = [
    'from-yellow-400/20 to-amber-400/20 border-yellow-400/30',
    'from-gray-300/20 to-gray-400/20 border-gray-300/30',
    'from-orange-400/20 to-amber-600/20 border-orange-400/30',
]

export default function InsightSection({
    title,
    subtitle,
    chart,
    topItems,
    stats,
    isFetching = false,
}: InsightSectionProps) {
    return (
        <SectionContainer>
            <BackgroundGrid />
            <LoadingOverlay isLoading={isFetching} />

            <SectionContent maxWidth="7xl" isFetching={isFetching}>
                <SectionHeader title={title} subtitle={subtitle} variant="large" mb="md" />

                <div className="space-y-8">
                    {chart}

                    {topItems && topItems.length > 0 && (
                        <Grid cols={3} gap="sm">
                            {topItems.slice(0, 3).map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative bg-gradient-to-br ${RANK_COLORS[index]} backdrop-blur-sm border rounded-2xl p-4 text-center transition-transform hover:scale-105`}
                                >
                                    <div className="text-3xl mb-2">{MEDALS[index]}</div>
                                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">{item.label}</div>
                                    <div className="text-sm sm:text-base text-white/60 font-medium">{item.value}</div>
                                    {index === 0 && (
                                        <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-black px-2 py-1 rounded-full shadow-lg">
                                            TOP
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Grid>
                    )}

                    {stats && stats.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <div
                                className={`grid gap-4 ${
                                    stats.length === 4
                                        ? 'grid-cols-2 sm:grid-cols-4'
                                        : stats.length === 3
                                          ? 'grid-cols-3'
                                          : stats.length === 2
                                            ? 'grid-cols-2'
                                            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                                }`}
                            >
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm text-white/50 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SectionContent>
        </SectionContainer>
    )
}
