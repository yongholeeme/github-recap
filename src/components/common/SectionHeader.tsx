import type {ReactNode} from 'react'

type HeaderVariant = 'default' | 'large' | 'compact'

interface SectionHeaderProps {
    title: ReactNode
    subtitle?: ReactNode
    label?: string
    variant?: HeaderVariant
    align?: 'left' | 'center'
    className?: string
}

const variantStyles = {
    default: {
        title: 'text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight',
        subtitle: 'text-lg sm:text-xl text-white/60 font-medium',
        label: 'text-sm sm:text-base text-white/80 font-medium tracking-wider uppercase',
    },
    large: {
        title: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-[-0.02em]',
        subtitle: 'text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold tracking-tight',
        label: 'text-sm sm:text-base md:text-lg text-white/80 font-medium tracking-wider uppercase',
    },
    compact: {
        title: 'text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight',
        subtitle: 'text-base sm:text-lg text-white/50 font-medium',
        label: 'text-xs sm:text-sm text-white/70 font-medium tracking-wider uppercase',
    },
}

export default function SectionHeader({
    title,
    subtitle,
    label,
    variant = 'default',
    align = 'center',
    className = '',
}: SectionHeaderProps) {
    const styles = variantStyles[variant]
    const alignClass = align === 'center' ? 'text-center' : 'text-left'

    return (
        <div className={`${alignClass} ${className}`}>
            {label && (
                <div
                    className={`inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6 ${
                        align === 'center' ? 'mx-auto' : ''
                    }`}
                >
                    <p className={styles.label}>{label}</p>
                </div>
            )}
            <h2 className={`${styles.title} mb-4`}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    )
}
