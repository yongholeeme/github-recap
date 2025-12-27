import type {ReactNode} from 'react'

import Grid from '@/components/commons/Grid'
import Section from '@/components/commons/Section'

interface InsightSectionProps {
    title: string
    subtitle: string
    chart: ReactNode
    topItems?: {
        label: string
        value: string | number
        rank: number
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
    isFetching = false,
}: InsightSectionProps) {
    return (
        <Section title={title} subtitle={subtitle} headerMb="md" maxWidth="7xl" isFetching={isFetching}>
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

            </div>
        </Section>
    )
}
