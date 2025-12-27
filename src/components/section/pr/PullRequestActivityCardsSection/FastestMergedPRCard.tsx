import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMyFastestMergedPr} from '@/libs/hooks/useMyMergedPrs'

export default function FastestMergedPRCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useMyFastestMergedPr(year)

    if (!data || !data.mergedAt) {
        return <StatCard title={t('pr.cards.fastestMerged.title')} value="-" description={t('pr.cards.fastestMerged.description')} isFetching={isFetching} />
    }

    const formattedTime = (() => {
        const hours = (new Date(data.mergedAt).getTime() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60)
        const minutes = hours * 60
        const seconds = minutes * 60

        if (seconds < 60) {
            return t('time.seconds', {count: Math.round(seconds)})
        } else if (minutes < 60) {
            return t('time.minutes', {count: Math.round(minutes)})
        } else if (hours < 24) {
            return t('time.hours', {count: Math.round(hours)})
        } else {
            const days = Math.floor(hours / 24)
            const remainingHours = Math.round(hours % 24)
            return remainingHours > 0 ? t('time.daysAndHours', {days, hours: remainingHours}) : t('time.days', {count: days})
        }
    })()

    return (
        <StatCard
            title={t('pr.cards.fastestMerged.title')}
            value={formattedTime}
            description={data.title}
            link={data.url}
            isFetching={isFetching}
        />
    )
}
