import type {ReactNode} from 'react'

interface LoginModalLayoutProps {
    onClose: () => void
    title: string
    description: ReactNode
    children: ReactNode
}

export default function LoginModalLayout({onClose, title, description, children}: LoginModalLayoutProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
                <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-sm">{description}</p>
                    </div>

                    <div className="space-y-4">{children}</div>
                </div>
            </div>
        </div>
    )
}
