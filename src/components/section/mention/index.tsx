import SectionGroup from '@/components/commons/SectionGroup'
import MentionsSection from '@/components/section/mention/MentionsSection'
import TopMentionedBySection from '@/components/section/mention/TopMentionedBySection'

export default function MentionSections() {
    return (
        <SectionGroup gradient="indigo">
            <MentionsSection />
            <TopMentionedBySection />
        </SectionGroup>
    )
}
