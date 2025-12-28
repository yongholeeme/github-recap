import {useEffect, useState, useRef} from 'react'

import {config} from '@config'
import {useQueryClient} from '@tanstack/react-query'

import type {User} from '@/types/user'

import LoginModal from '@/components/auth/LoginModal'
import LoginScreen from '@/components/auth/LoginScreen'
import LanguageSwitcher from '@/components/commons/LanguageSwitcher'
import RefreshButton from '@/components/commons/RefreshButton'
import CommitSections from '@/components/section/commit'
import GrowthSections from '@/components/section/growth'
import IntroSections from '@/components/section/intro'
import IssueSections from '@/components/section/issue'
import MentionSections from '@/components/section/mention'
import OutroSections from '@/components/section/outro'
import PrSections from '@/components/section/pr'
import {REACT_QUERY_CACHE_STORAGE_KEY} from '@/constants/storage'
import {UserProvider} from '@/contexts/UserContext'
import {YearProvider} from '@/contexts/YearContext'
import {checkAuth, checkOAuthSession, clearCacheBeforeLogin} from '@/libs/auth'

interface YearRecapProps {
    year?: number
}

export default function YearRecap({year}: YearRecapProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const queryClient = useQueryClient()

    // Default to current year if not specified
    const targetYear = year || new Date().getFullYear()

    // TODO: Use targetYear to filter data in the future

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isLoginModalOpen) {
                return
            }

            const container = containerRef.current
            if (!container) {
                return
            }

            // Next section: ArrowDown, ArrowRight, Space
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space') {
                e.preventDefault()
                container.scrollBy({
                    top: window.innerHeight,
                    behavior: 'smooth',
                })
            }
            // Previous section: ArrowUp, ArrowLeft
            else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
                e.preventDefault()
                container.scrollBy({
                    top: -window.innerHeight,
                    behavior: 'smooth',
                })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isLoginModalOpen])

    useEffect(() => {
        const initAuth = async () => {
            try {
                let _user: User | null = null

                if (config.auth.method === 'oauth') {
                    // OAuth: Supabase 세션 확인
                    _user = await checkOAuthSession()
                } else {
                    // PAT: localStorage에서 토큰 확인
                    _user = await checkAuth()
                }

                if (!_user) {
                    // Invalid auth, clear cache
                    queryClient.clear()
                    localStorage.removeItem(REACT_QUERY_CACHE_STORAGE_KEY)
                }

                setUser(_user)
            } catch (error) {
                console.error('Failed to check auth:', error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [queryClient])

    const handleLogin = (newUser: User) => {
        // Clear previous user's cache
        clearCacheBeforeLogin(queryClient)
        setUser(newUser)
    }

    // Loading
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        )
    }

    // Not logged in
    if (!user) {
        return (
            <>
                <LanguageSwitcher />
                <LoginScreen onPATLogin={() => setIsLoginModalOpen(true)} />
                <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    onLogin={handleLogin}
                />
            </>
        )
    }

    // Logged in
    return (
        <UserProvider user={user}>
            <YearProvider year={targetYear}>
                <RefreshButton />
                <LanguageSwitcher />

                <div
                    ref={containerRef}
                    className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
                >
                    <IntroSections />
                    <CommitSections />
                    <PrSections />
                    <IssueSections />
                    <MentionSections />
                    <GrowthSections />
                    <OutroSections />
                </div>
            </YearProvider>
        </UserProvider>
    )
}
