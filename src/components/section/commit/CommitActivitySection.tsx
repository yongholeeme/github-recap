import {useTranslation} from 'react-i18next'

import BigNumberSection from '@/components/commons/BigNumberSection'
import {useYear} from '@/contexts/YearContext'
import {useCountOfCommits} from '@/libs/hooks/useCountOfCommits'

export default function CommitActivitySection() {
    const {t} = useTranslation()
    const {year} = useYear()
    const {data, isFetching} = useCountOfCommits(year)

    return (
        <BigNumberSection
            value={data}
            isFetching={isFetching}
            title={t('commit.activity.title', {year})}
            subtitle={t('commit.activity.subtitle')}
        />
    )
}
