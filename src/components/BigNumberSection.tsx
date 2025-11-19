import {useState, useEffect} from 'react'

import {CountUpAnimation} from '@/components/CountUpAnimation'

interface BigNumberSectionProps {
    value: number | undefined
    isFetching: boolean
    title: string
    subtitle: string
    colors?: {
        background: string
        glow: string
        text: string
    }
}

export default function BigNumberSection({
    value,
    isFetching,
    title,
    subtitle,
    colors = {
        background: 'from-blue-950 via-indigo-950 to-purple-950',
        glow: 'from-blue-400 via-cyan-300 to-purple-400',
        text: 'from-white via-blue-50 to-white',
    },
}: BigNumberSectionProps) {
    const [randomNumber, setRandomNumber] = useState(0)

    useEffect(() => {
        if (!isFetching) {return}

        const interval = setInterval(() => {
            setRandomNumber(Math.floor(Math.random() * 1000))
        }, 1000)

        return () => clearInterval(interval)
    }, [isFetching])
    return (
        <div className="h-screen snap-start flex items-center justify-center relative overflow-hidden w-full">
            {/* 애니메이션 그라디언트 오버레이 */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/10 to-transparent animate-pulse" />

            {/* 떠다니는 파티클 효과 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite_2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] animate-[float_12s_ease-in-out_infinite_4s]" />
            </div>

            {/* 그리드 패턴 */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center">
                {/* 상단 레이블 */}
                <div className="mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium tracking-wider uppercase">
                            {title}
                        </p>
                    </div>
                </div>

                {/* 메인 숫자 */}
                <div className="relative mb-12 sm:mb-16">
                    {isFetching ? (
                        <>
                            {/* 외곽 글로우 레이어 */}
                            <div className="absolute inset-0 flex items-center justify-center blur-[100px] sm:blur-[120px] opacity-15 animate-pulse">
                                <div
                                    className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black bg-gradient-to-r ${colors.glow} bg-clip-text text-transparent`}
                                >
                                    {randomNumber}
                                </div>
                            </div>

                            {/* 중간 글로우 레이어 */}
                            <div className="absolute inset-0 flex items-center justify-center blur-[60px] sm:blur-[80px] opacity-20 animate-pulse">
                                <div
                                    className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black bg-gradient-to-r ${colors.glow} bg-clip-text text-transparent`}
                                >
                                    {randomNumber}
                                </div>
                            </div>

                            {/* 메인 텍스트 레이어 */}
                            <div className="relative text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black leading-none tracking-tighter">
                                <div
                                    className={`bg-gradient-to-r ${colors.text} bg-clip-text text-transparent opacity-30 animate-pulse`}
                                >
                                    {randomNumber}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* 외곽 글로우 레이어 - 가장 큰 블러 */}
                            <div className="absolute inset-0 flex items-center justify-center blur-[100px] sm:blur-[120px] opacity-20">
                                <div
                                    className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black bg-gradient-to-r ${colors.glow} bg-clip-text text-transparent`}
                                >
                                    {value}
                                </div>
                            </div>

                            {/* 중간 글로우 레이어 */}
                            <div className="absolute inset-0 flex items-center justify-center blur-[60px] sm:blur-[80px] opacity-25">
                                <div
                                    className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black bg-gradient-to-r ${colors.glow} bg-clip-text text-transparent`}
                                >
                                    {value}
                                </div>
                            </div>

                            {/* 내부 글로우 레이어 */}
                            <div className="absolute inset-0 flex items-center justify-center blur-[30px] sm:blur-[40px] opacity-30">
                                <div
                                    className={`text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black bg-gradient-to-r ${colors.glow} bg-clip-text text-transparent`}
                                >
                                    {value}
                                </div>
                            </div>

                            {/* 메인 텍스트 레이어 */}
                            <div className="relative text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black leading-none tracking-tighter">
                                <div className={`bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`}>
                                    <CountUpAnimation value={value || 0} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* 하단 설명 */}
                <div className="text-center max-w-2xl space-y-4">
                    <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold tracking-tight">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}
