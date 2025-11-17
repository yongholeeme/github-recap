interface RepositoryStats {
  repo: string;
  count: number;
  owner?: string;
}

interface RepositoryStatsSectionProps {
  title: string;
  subtitle: string;
  data: RepositoryStats[] | undefined;
  isFetching: boolean;
  countLabel: string;
  linkType: 'commits' | 'pulls' | 'issues';
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

import { config } from "@/../config";

export default function RepositoryStatsSection({
  title,
  subtitle,
  data,
  isFetching,
  countLabel,
  linkType,
  colorScheme,
}: RepositoryStatsSectionProps) {
  const repos = data || [];

  const getRepoLink = (repoFullName: string, username?: string) => {
    // Extract origin from config.github.baseUrl
    // Example: 'https://oss.fin.navercorp.com/api/v3' -> 'https://oss.fin.navercorp.com'
    const apiUrl = new URL(config.github.baseUrl);
    const origin = apiUrl.origin;
    const baseUrl = `${origin}/${repoFullName}`;
    
    switch (linkType) {
      case 'commits':
        return username 
          ? `${baseUrl}/commits/main/?author=${username}`
          : `${baseUrl}/commits`;
      case 'pulls':
        return `${baseUrl}/pulls?q=author%3A%40me+`
      case 'issues':
        return `${baseUrl}/issues?q=author%3A%40me+`;
      default:
        return baseUrl;
    }
  };

  return (
    <section className="snap-start min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 select-none">
            {title}
          </h2>
          <p className="text-lg text-gray-400 select-none">{subtitle}</p>
        </div>

        {isFetching ? (
          <div className="text-center text-gray-400 text-lg">
            데이터를 불러오는 중...
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            {countLabel} 데이터가 없습니다
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[65vh] overflow-y-auto p-2 scrollbar-hide">
              {repos.map((repo, index) => {
                const totalCount = repos.reduce((acc, r) => acc + r.count, 0);
                const percentage = ((repo.count / totalCount) * 100).toFixed(1);

                return (
                  <a
                    key={repo.repo}
                    href={getRepoLink(repo.repo, repo.owner)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative rounded-lg p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2`}
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.primary}15, ${colorScheme.secondary}15)`,
                      borderColor: `${colorScheme.primary}40`,
                    }}
                  >
                    {/* Rank badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                      style={{
                        background: index < 3 
                          ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                          : colorScheme.primary,
                        color: 'white',
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Repository name */}
                    <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.secondary})`,
                      }}
                    >
                      {repo.repo}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-3xl font-bold" style={{ color: colorScheme.accent }}>
                          {repo.count.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 ml-2">{countLabel}</span>
                      </div>
                      <span className="text-xs text-gray-500">{percentage}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${colorScheme.primary}, ${colorScheme.accent})`,
                        }}
                      />
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-3 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      클릭하여 저장소 방문 →
                    </div>
                  </a>
                );
              })}
            </div>
            
            <div className="text-center mt-6 text-sm text-gray-500">
              총 {repos.length}개의 저장소 · {repos.reduce((acc, r) => acc + r.count, 0).toLocaleString()} {countLabel}
            </div>
          </>
        )}
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
