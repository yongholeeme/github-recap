import BigNumberSection from '@/components/BigNumberSection'
import TopMentionedByCard from '@/components/stats/TopMentionedByCard'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMentionsMe} from '@/lib/hooks/useCountOfMentionsMe'

export default function MentionsSection() {
    const {year} = useYear()
    const {data: mentionsCount, isFetching} = useCountOfMentionsMe(year)

    return (
        <>
            <BigNumberSection
                value={mentionsCount}
                isFetching={isFetching}
                title={`${year}년 멘션 받은 횟수`}
                subtitle="당신을 향한 관심"
                colors={{
                    background: 'from-indigo-950 via-purple-950 to-fuchsia-950',
                    glow: 'from-indigo-400 via-purple-400 to-fuchsia-400',
                    text: 'from-white via-purple-50 to-white',
                }}
            />

            {/* Top Mentioners Section */}
            <div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <TopMentionedByCard />
                </div>
            </div>
        </>
    )
}
