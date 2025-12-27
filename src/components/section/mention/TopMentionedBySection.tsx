import {useState} from 'react'

import {useTranslation} from 'react-i18next'

import Section from '@/components/commons/Section'
import {useYear} from '@/contexts/YearContext'
import {type MentionDetail} from '@/libs/github/issues'
import {usePeopleToMentionMe} from '@/libs/hooks/usePeopleToMentionMe'

export default function TopMentionedBySection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const [displayCount, setDisplayCount] = useState(10)
    const {data, isFetching} = usePeopleToMentionMe(year, 100)

    return (
        <Section
            title={t('mention.topMentionedBy.title')}
            subtitle={t('mention.topMentionedBy.subtitle')}
            variant="compact"
            headerMb="md"
            isFetching={isFetching}
            maxWidth="2xl"
        >
            <div className="space-y-2">
                {(data && data.length > 0
                    ? (data as MentionDetail[])
                    : Array.from({length: 10}, (_, i) => ({username: '', count: 0, index: i}))
                )
                    .slice(0, displayCount)
                    .map((item, index) => (
                        <div
                            key={item.username || `placeholder-${index}`}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-white/80 w-6">{index + 1}.</span>
                                <span className="text-sm font-semibold text-white">
                                    {item.username ? `@${item.username}` : '-'}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-blue-400">
                                {item.count > 0 ? t('common.times', {count: item.count}) : '-'}
                            </span>
                        </div>
                    ))}
            </div>
            {data && data.length > displayCount && (
                <button
                    type="button"
                    onClick={() => setDisplayCount((prev) => prev + 10)}
                    className="w-full mt-4 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-white transition-colors"
                >
                    {t('common.more')}
                </button>
            )}
        </Section>
    )
}
