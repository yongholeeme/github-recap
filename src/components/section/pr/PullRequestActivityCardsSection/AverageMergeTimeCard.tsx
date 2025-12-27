import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMyAverageMergeTime} from '@/libs/hooks/useMyMergedPrs'

export default function AverageMergeTimeCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useMyAverageMergeTime(year)

    if (data === null || data === undefined) {
        return <StatCard title={t('pr.cards.avgMergeTime.title')} value="-" description={t('pr.cards.avgMergeTime.description')} isFetching={isFetching} />
    }

    const formatTime = (hours: number) => {
        if (hours < 1) {
            return t('time.minutes', {count: Math.round(hours * 60)})
        } else if (hours < 24) {
            return t('time.hours', {count: Math.round(hours)})
        } else {
            const days = Math.floor(hours / 24)
            const remainingHours = Math.round(hours % 24)
            return remainingHours > 0 ? t('time.daysAndHours', {days, hours: remainingHours}) : t('time.days', {count: days})
        }
    }

    return (
        <StatCard
            title={t('pr.cards.avgMergeTime.title')}
            value={formatTime(data)}
            description={t('pr.cards.avgMergeTime.description')}
            isFetching={isFetching}
        />
    )
}
