import type {ReactNode} from 'react'

interface SectionContentProps {
    children: ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
    className?: string
    isFetching?: boolean
}

const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
}

export default function SectionContent({
    children,
    maxWidth = '6xl',
    className = '',
    isFetching = false,
}: SectionContentProps) {
    return (
        <div
            className={`
                relative z-10 w-full ${maxWidthMap[maxWidth]} mx-auto
                px-4 sm:px-6 md:px-8 lg:px-12
                py-8 sm:py-12 md:py-16
                ${isFetching ? 'opacity-60 pointer-events-none' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    )
}
