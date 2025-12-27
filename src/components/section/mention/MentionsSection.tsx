import {useTranslation} from 'react-i18next'

import BigNumberSection from '@/components/commons/BigNumberSection'
import {useYear} from '@/contexts/YearContext'
import {useCountOfMentionsMe} from '@/libs/hooks/useCountOfMentionsMe'

export default function MentionsSection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data: mentionsCount, isFetching} = useCountOfMentionsMe(year)

    return (
        <BigNumberSection
            value={mentionsCount}
            isFetching={isFetching}
            title={t('mention.count.title', {year})}
            subtitle={t('mention.count.subtitle')}
            colors={{
                background: 'from-indigo-950 via-purple-950 to-fuchsia-950',
                glow: 'from-indigo-400 via-purple-400 to-fuchsia-400',
                text: 'from-white via-purple-50 to-white',
            }}
        />
    )
}
