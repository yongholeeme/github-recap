import type {ReactNode} from 'react'

interface ToastProps {
    isVisible: boolean
    onClose?: () => void
    position?: 'top-right' | 'bottom-center'
    children: ReactNode
}

export default function Toast({isVisible, onClose, position = 'top-right', children}: ToastProps) {
    const positionClasses =
        position === 'bottom-center'
            ? 'left-1/2 -translate-x-1/2 bottom-6 w-[calc(100%-2rem)] max-w-sm sm:max-w-md'
            : 'left-1/2 -translate-x-1/2 bottom-6 w-[calc(100%-2rem)] max-w-sm sm:left-auto sm:right-4 sm:top-4 sm:bottom-auto sm:translate-x-0 sm:w-auto sm:max-w-md'

    const animationClasses = isVisible
        ? 'translate-y-0 opacity-100'
        : position === 'bottom-center'
          ? 'translate-y-full opacity-0'
          : 'translate-y-full opacity-0 sm:translate-y-0 sm:translate-x-full'

    return (
        <div className={`fixed z-50 transition-all duration-500 ${positionClasses} ${animationClasses}`}>
            <div className="relative bg-gradient-to-br from-blue-500/30 via-cyan-500/30 to-purple-500/30 backdrop-blur-xl border border-white/30 rounded-3xl sm:rounded-2xl p-4 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse rounded-3xl sm:rounded-2xl" />

                <div className="relative flex items-start gap-3">
                    {children}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 text-white/50 hover:text-white/80 transition-colors"
                            aria-label="Close"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M12 4L4 12M4 4L12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
