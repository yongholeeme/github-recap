import {useEffect, useState} from 'react'

interface LoginToastProps {
    onLoginClick: () => void
}

export default function LoginToast({onLoginClick}: LoginToastProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Show toast after 1 second
        const showTimer = setTimeout(() => {
            setIsAnimating(true)
            // Small delay to trigger CSS transition
            setTimeout(() => {
                setIsVisible(true)
            }, 10)
        }, 0)

        return () => clearTimeout(showTimer)
    }, [])

    if (!isAnimating) {return null}

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div
                className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md pointer-events-auto transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
            >
                <div className="flex-1">
                    <p className="font-semibold mb-1">로그인하고 나만의 GitHub 회고를 확인하세요!</p>
                    <p className="text-sm text-white/80">지금 보는 건 예시 데이터입니다</p>
                </div>
                <button
                    onClick={onLoginClick}
                    className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                    로그인
                </button>
            </div>
        </div>
    )
}
