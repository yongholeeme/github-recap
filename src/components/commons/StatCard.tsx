import {useTranslation} from 'react-i18next'

import {CountUpAnimation} from '@/components/commons/CountUpAnimation'

interface StatCardProps {
    title: string
    description?: string
    value?: number | string
    isFetching: boolean
    error?: Error | null
    isClickable?: boolean
    onClick?: () => void
    suffix?: string
    link?: string
    compact?: boolean
}

export default function StatCard({
    title,
    description,
    value,
    isFetching,
    error,
    isClickable,
    onClick,
    suffix,
    link,
    compact = false,
}: StatCardProps) {
    const {t} = useTranslation()
    const isNumberValue = typeof value === 'number'

    const content = (
        <div
            className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 ${
                compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'
            } ${isClickable || link ? 'cursor-pointer' : ''} ${isFetching ? 'pointer-events-none opacity-60' : ''}`}
            onClick={isClickable && value !== undefined && !isFetching ? onClick : undefined}
        >
            {isFetching && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] z-10" />
            )}

            <div className={`relative flex flex-col justify-between ${compact ? 'min-h-[80px]' : 'min-h-[120px]'}`}>
                <div className={compact ? 'mb-2' : 'mb-4'}>
                    <h3 className={`font-bold text-white ${compact ? 'text-xs mb-0.5' : 'text-sm mb-1'}`}>{title}</h3>
                    {description && !compact && <p className="text-xs text-white/60 line-clamp-2">{description}</p>}
                </div>

                <div className="mt-auto">
                    {error && value === undefined && (
                        <p className={`text-red-400 font-semibold ${compact ? 'text-xs' : 'text-sm'}`}>
                            {t('common.error')}
                        </p>
                    )}
                    {error && value !== undefined && isNumberValue && (
                        <>
                            {!compact && (
                                <div className="flex items-center gap-1 mb-2">
                                    <svg
                                        className="w-3 h-3 text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-xs text-red-400">{t('common.refreshFailed')}</p>
                                </div>
                            )}
                            <div className="flex items-baseline gap-1 flex-wrap">
                                <span
                                    className={`font-black text-white tabular-nums ${compact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'}`}
                                >
                                    {value.toLocaleString()}
                                </span>
                                {suffix && (
                                    <span
                                        className={`font-bold text-white/80 ${compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`}
                                    >
                                        {suffix}
                                    </span>
                                )}
                                {isClickable && !compact && (
                                    <span className="text-xs text-white/50 ml-auto">{t('common.clickToView')}</span>
                                )}
                            </div>
                        </>
                    )}
                    {!error && value !== undefined && (
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span
                                className={`font-black text-white tabular-nums ${compact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'}`}
                            >
                                {isNumberValue ? <CountUpAnimation value={value} /> : value}
                            </span>
                            {suffix && (
                                <span
                                    className={`font-bold text-white/80 ${compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`}
                                >
                                    {suffix}
                                </span>
                            )}
                            {link && (
                                <svg
                                    className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            )}
                            {isClickable && !compact && (
                                <span className="text-xs text-white/50 ml-auto">{t('common.clickToView')}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                {content}
            </a>
        )
    }

    return content
}
