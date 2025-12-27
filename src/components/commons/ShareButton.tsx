import {useState} from 'react'

import {useTranslation} from 'react-i18next'

import {useUser} from '@/contexts/UserContext'
import {useYear} from '@/contexts/YearContext'
import {useShareData} from '@/libs/hooks/useShareData'
import {downloadShareImage, generateShareImage, shareImage} from '@/libs/share/generateShareImage'

export default function ShareButton() {
    const {t} = useTranslation()
    const user = useUser()
    const {year} = useYear()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const {data: shareData, isLoading} = useShareData({
        year,
        userName: user?.user_name || '',
        avatarUrl: user?.avatar_url || '',
    })

    const handleOpenModal = async () => {
        if (!shareData) {
            return
        }

        setIsModalOpen(true)
        setIsGenerating(true)

        try {
            const blob = await generateShareImage(shareData)
            const url = URL.createObjectURL(blob)
            setPreviewUrl(url)
        } catch (error) {
            console.error('Failed to generate preview:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
    }

    const handleDownload = async () => {
        if (!shareData) {
            return
        }
        await downloadShareImage(shareData)
    }

    const handleShare = async () => {
        if (!shareData) {
            return
        }

        const shared = await shareImage(shareData)
        if (!shared) {
            // Fallback to download if share is not supported
            await handleDownload()
        }
    }

    const canShare = typeof navigator !== 'undefined' && !!navigator.share

    if (isLoading || !shareData) {
        return null
    }

    return (
        <>
            {/* Share Button */}
            <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full hover:from-blue-400 hover:to-purple-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                </svg>
                {t('share.button')}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">{t('share.title')}</h3>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="p-2 text-white/60 hover:text-white/90 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="mb-6 rounded-xl overflow-hidden bg-black/20 aspect-square flex items-center justify-center">
                            {isGenerating ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span className="text-sm text-white/60">{t('share.generating')}</span>
                                </div>
                            ) : previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-white/40">{t('share.previewFailed')}</span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                {t('share.download')}
                            </button>
                            {canShare && (
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    disabled={isGenerating}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-400 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        />
                                    </svg>
                                    {t('share.share')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
