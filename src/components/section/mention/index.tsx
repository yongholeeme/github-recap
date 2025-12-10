import MentionsSection from '@/components/section/mention/MentionsSection'
import TopMentionedBySection from '@/components/section/mention/TopMentionedBySection'

export default function MentionSections() {
    return (
        <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950">
            <MentionsSection />
            <TopMentionedBySection />
        </div>
    )
}
