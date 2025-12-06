interface LoadingOverlayProps {
    isLoading: boolean
    variant?: 'shimmer' | 'fade'
}

export default function LoadingOverlay({isLoading, variant = 'shimmer'}: LoadingOverlayProps) {
    if (!isLoading) {
        return null
    }

    if (variant === 'fade') {
        return <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none" />
    }

    return (
        <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 pointer-events-none"
            style={{
                animation: 'shimmer 2s infinite',
            }}
        />
    )
}
