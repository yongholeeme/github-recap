import type {ReactNode} from 'react'

interface SectionContainerProps {
    children: ReactNode
    className?: string
    fullHeight?: boolean
}

export default function SectionContainer({
    children,
    className = '',
    fullHeight = true,
}: SectionContainerProps) {
    return (
        <section
            className={`
                ${fullHeight ? 'min-h-screen' : ''}
                w-full snap-start relative overflow-hidden
                flex items-center justify-center
                ${className}
            `}
        >
            {children}
        </section>
    )
}
