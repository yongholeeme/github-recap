interface RepositoryStats {
    repo: string
    count: number
    owner?: string
}

interface RepositoryStatsSectionProps {
    title: string
    subtitle: string
    data: RepositoryStats[] | undefined
    isFetching: boolean
    countLabel: string
    linkType: 'commits' | 'pulls' | 'issues'
    colorScheme: {
        primary: string
        secondary: string
        accent: string
    }
}

import {config} from '@config'

export default function RepositoryStatsSection({
    title,
    subtitle,
    data,
    isFetching,
    countLabel,
    linkType,
    colorScheme,
}: RepositoryStatsSectionProps) {
    const repos = data || []

    const getRepoLink = (repoFullName: string, username?: string) => {
        // Extract origin from config.github.baseUrl
        // Example: 'https://oss.fin.navercorp.com/api/v3' -> 'https://oss.fin.navercorp.com'
        const url = new URL(config.github.url)
        const origin = url.origin
        const baseUrl = `${origin}/${repoFullName}`

        switch (linkType) {
            case 'commits':
                return username ? `${baseUrl}/commits/main/?author=${username}` : `${baseUrl}/commits`
            case 'pulls':
                return `${baseUrl}/pulls?q=author%3A%40me+`
            case 'issues':
                return `${baseUrl}/issues?q=author%3A%40me+`
            default:
                return baseUrl
        }
    }

    const SkeletonCard = () => (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-6 backdrop-blur-sm border border-gray-700/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent -translate-x-full animate-shimmer" />
            <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                    <div className="h-5 bg-gray-700/50 rounded-lg w-2/3" />
                    <div className="w-9 h-9 bg-gray-700/50 rounded-full" />
                </div>
                <div className="h-12 bg-gray-700/50 rounded-lg w-1/3" />
                <div className="h-3 bg-gray-700/50 rounded-full w-full" />
            </div>
        </div>
    )

    return (
        <section className="snap-start min-h-screen flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">{title}</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {isFetching ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : repos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div
                            className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.accent}20)`,
                            }}
                        >
                            <svg
                                className="w-10 h-10"
                                style={{color: colorScheme.primary}}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-300 mb-2">데이터가 없습니다</p>
                        <p className="text-gray-500">활동을 시작하면 여기에 표시됩니다</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[65vh] overflow-y-auto pr-2 scrollbar-custom py-2">
                        {repos.map((repo, index) => {
                            const totalCount = repos.reduce((acc, r) => acc + r.count, 0)
                            const percentage = ((repo.count / totalCount) * 100).toFixed(1)
                            const isTopThree = index < 3

                            return (
                                <a
                                    key={repo.repo}
                                    href={getRepoLink(repo.repo, repo.owner)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer border backdrop-blur-sm"
                                    style={{
                                        background: `linear-gradient(135deg, ${colorScheme.primary}10, ${colorScheme.secondary}10)`,
                                        borderColor: isTopThree
                                            ? `${colorScheme.accent}40`
                                            : `${colorScheme.primary}20`,
                                        boxShadow: `0 4px 16px ${colorScheme.primary}08`,
                                    }}
                                >
                                    {/* Background glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(circle at center, ${colorScheme.accent}08, transparent 70%)`,
                                        }}
                                    />

                                    {/* Rank badge */}
                                    <div
                                        className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-110"
                                        style={{
                                            background: isTopThree
                                                ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                                : `${colorScheme.primary}30`,
                                            color: isTopThree ? 'white' : colorScheme.accent,
                                        }}
                                    >
                                        #{index + 1}
                                    </div>

                                    {/* Repository name */}
                                    <div className="relative mb-6 pr-12">
                                        <h3 className="text-lg font-bold text-white truncate">{repo.repo}</h3>
                                    </div>

                                    {/* Count */}
                                    <div className="relative mb-4">
                                        <div className="flex items-end gap-3">
                                            <span
                                                className="text-5xl font-black tracking-tighter"
                                                style={{color: colorScheme.accent}}
                                            >
                                                {repo.count.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 text-sm font-semibold uppercase pb-2">
                                                {countLabel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Activity proportion */}
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-500 font-medium">내 활동 비중</span>
                                            <span className="text-sm font-bold" style={{color: colorScheme.primary}}>
                                                {percentage}%
                                            </span>
                                        </div>
                                        <div className="relative w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700 ease-out"
                                                style={{
                                                    width: `${percentage}%`,
                                                    background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.accent})`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Hover arrow */}
                                    <div
                                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                                        style={{
                                            background: `${colorScheme.accent}20`,
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            style={{color: colorScheme.accent}}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                )}
            </div>

            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: ${colorScheme.primary}50 transparent;
        }
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: ${colorScheme.primary}50;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: ${colorScheme.primary}80;
        }
      `}</style>
        </section>
    )
}
