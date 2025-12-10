import TopMentionedByCard from '@/components/TopMentionedByCard'
import BackgroundGrid from '@/components/ui/BackgroundGrid'
import BigNumberSection from '@/components/ui/BigNumberSection'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionContent from '@/components/ui/SectionContent'
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

            <SectionContainer>
                <BackgroundGrid />
                <SectionContent>
                    <TopMentionedByCard />
                </SectionContent>
            </SectionContainer>
        </>
    )
}
