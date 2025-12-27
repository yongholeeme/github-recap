import {useTranslation} from 'react-i18next'

interface BarChartProps {
    data: {
        label: string | number
        value: number
        isPeak?: boolean
    }[]
    maxValue: number
    height?: number
    barHeight?: number
}

export default function BarChart({data, maxValue, height = 320, barHeight = 280}: BarChartProps) {
    const {t} = useTranslation()
    return (
        <div className="flex items-end justify-between gap-1 sm:gap-2" style={{height: `${height}px`}}>
            {data.map((item, index) => {
                const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0
                const minHeight = item.value > 0 ? 4 : 0
                const calculatedHeight = Math.max(percentage, minHeight)

                return (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2 group"
                        style={{flex: '1 1 0%', minWidth: 0}}
                    >
                        {/* Bar Container */}
                        <div
                            className="relative w-full"
                            style={{
                                height: `${barHeight}px`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {item.value > 0 ? (
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                                        item.isPeak
                                            ? 'bg-gradient-to-t from-blue-400 to-cyan-300 shadow-lg shadow-blue-500/50'
                                            : 'bg-gradient-to-t from-blue-600/60 to-blue-400/60'
                                    } hover:opacity-80`}
                                    style={{height: `${calculatedHeight}%`, minHeight: item.value > 0 ? '8px' : '0'}}
                                >
                                    {/* Glow effect for peak items */}
                                    {item.isPeak && (
                                        <div
                                            className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-blue-400 to-cyan-300 blur-md opacity-50"
                                            style={{zIndex: -1}}
                                        />
                                    )}
                                    {/* Value Label on hover - positioned above bar */}
                                    {item.value > 0 && (
                                        <div
                                            className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                                            style={{bottom: '100%', marginBottom: '4px'}}
                                        >
                                            {t('common.items', {count: item.value})}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full bg-white/10 rounded" style={{height: '2px'}} />
                            )}
                        </div>

                        {/* Label */}
                        <div
                            className={`text-xs sm:text-sm font-medium ${
                                item.isPeak ? 'text-cyan-300 font-bold' : 'text-white/50'
                            }`}
                        >
                            {item.label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
