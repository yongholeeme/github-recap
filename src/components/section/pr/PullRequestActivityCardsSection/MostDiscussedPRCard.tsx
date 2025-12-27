import {useTranslation} from 'react-i18next'

import StatCard from '@/components/commons/StatCard'
import {useYear} from '@/contexts/YearContext'
import {useMostDiscussedPR} from '@/libs/hooks/useMostDiscussedPR'

export default function MostDiscussedPRCard() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useMostDiscussedPR(year)
    console.log(data)

    if (!data) {
        return <StatCard title={t('pr.cards.mostDiscussed.title')} value="-" description={t('pr.cards.mostDiscussed.description')} isFetching={isFetching} />
    }

    return (
        <StatCard
            title={t('pr.cards.mostDiscussed.title')}
            value={t('common.comments', {count: data.comments})}
            description={data.title}
            link={data.url}
            isFetching={isFetching}
        />
    )
}
