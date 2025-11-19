import {useEffect, useRef, useState} from 'react'

import {useInView} from 'react-intersection-observer'

interface CountUpAnimationProps {
    value: number
    duration?: number // milliseconds
    className?: string
}

/**
 * 숫자가 0부터 목표값까지 증가하는 애니메이션 컴포넌트
 * easeOutExpo 이징 함수 사용으로 자연스러운 감속 효과
 * 화면에 보일 때만 애니메이션 시작
 */
export function CountUpAnimation({value, duration = 1000, className = ''}: CountUpAnimationProps) {
    const [displayValue, setDisplayValue] = useState(0)
    const startTimeRef = useRef<number | null>(null)
    const animationFrameRef = useRef<number | undefined>(undefined)
    const hasAnimatedRef = useRef(false)
    const targetValueRef = useRef(value)

    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    // value가 변경되면 targetValueRef 업데이트
    useEffect(() => {
        targetValueRef.current = value
    }, [value])

    useEffect(() => {
        // 아직 화면에 보이지 않거나 이미 애니메이션이 진행된 경우
        if (!inView || hasAnimatedRef.current) {
            return
        }

        if (targetValueRef.current === 0) {
            hasAnimatedRef.current = true
            return
        }

        startTimeRef.current = null
        hasAnimatedRef.current = true

        const animate = (currentTime: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = currentTime
            }

            const elapsed = currentTime - startTimeRef.current
            const progress = Math.min(elapsed / duration, 1)

            // easeOutExpo: 빠르게 시작해서 천천히 끝남
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

            const currentTarget = targetValueRef.current
            setDisplayValue(Math.floor(easeOutExpo * currentTarget))

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate)
            } else {
                setDisplayValue(currentTarget) // 정확한 최종값 설정
            }
        }

        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [value, duration, inView])

    return (
        <span ref={ref} className={`pr-4 ${className}`}>
            {displayValue.toLocaleString()}
        </span>
    )
}
