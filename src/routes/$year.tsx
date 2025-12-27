import {createFileRoute} from '@tanstack/react-router'
import {useTranslation} from 'react-i18next'

import YearRecap from '@/components/YearRecap'

export const Route = createFileRoute('/$year')({
    component: YearRoute,
})

function YearRoute() {
    const {t} = useTranslation()
    const params = Route.useParams()
    const yearNum = parseInt(params.year, 10)

    // Validate year
    if (isNaN(yearNum) || yearNum < 2008 || yearNum > 2030) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
                <div className="text-center">
                    <h1 className="text-6xl font-black text-white mb-4">404</h1>
                    <p className="text-xl text-gray-400">{t('routes.invalidYear')}</p>
                    <a
                        href="/"
                        className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        {t('routes.goHome')}
                    </a>
                </div>
            </div>
        )
    }

    return <YearRecap year={yearNum} />
}
