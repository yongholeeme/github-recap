import type {ReactNode} from 'react'

import BackgroundGrid from '@/components/commons/BackgroundGrid'
import LoadingOverlay from '@/components/commons/LoadingOverlay'
import SectionContainer from '@/components/commons/SectionContainer'
import SectionContent from '@/components/commons/SectionContent'
import SectionHeader from '@/components/commons/SectionHeader'

type HeaderVariant = 'default' | 'large' | 'compact'
type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

interface SectionProps {
    children: ReactNode
    title: ReactNode
    subtitle?: ReactNode
    variant?: HeaderVariant
    headerMb?: Spacing
    showBackground?: boolean
    isFetching?: boolean
    maxWidth?: MaxWidth
}

export default function Section({
    children,
    title,
    subtitle,
    variant = 'large',
    headerMb = 'xl',
    showBackground = true,
    isFetching = false,
    maxWidth = '6xl',
}: SectionProps) {
    return (
        <SectionContainer>
            {showBackground && <BackgroundGrid />}
            {isFetching && <LoadingOverlay isLoading={isFetching} />}

            <SectionContent maxWidth={maxWidth} isFetching={isFetching}>
                <SectionHeader title={title} subtitle={subtitle} variant={variant} mb={headerMb} />

                {children}
            </SectionContent>
        </SectionContainer>
    )
}
