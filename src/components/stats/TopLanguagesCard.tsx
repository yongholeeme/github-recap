import type { RepoData } from '@/lib/github/repositories';
import { getDateRange } from '@/lib/github/utils';
import { useRepositoriesData } from '@/lib/hooks/useRepositoriesData';
import { useYear } from '@/contexts/YearContext';

function calculateTopLanguages(
  repos: RepoData,
  year: number = new Date().getFullYear()
): Array<{ language: string; count: number; percentage: number }> {
  // Filter repos by creation or update date in the year
  const { startDate, endDate } = getDateRange(year);
  const filteredRepos = repos.filter((repo) => {
    if (!repo.updated_at) return false;
    const updatedAt = new Date(repo.updated_at);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return updatedAt >= start && updatedAt <= end;
  });

  const languageCounts: Record<string, number> = {};
  let totalCount = 0;

  for (const repo of filteredRepos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalCount++;
    }
  }

  const sortedLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / totalCount) * 100),
    }));

  return sortedLanguages;
}


export default function TopLanguagesCard() {
	const { year } = useYear();
	const { data: repos, isFetching, error } = useRepositoriesData(year);
	
	const data = repos ? calculateTopLanguages(repos, year) : undefined;

	return (
		<div
			className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
				isFetching ? "pointer-events-none" : ""
			}`}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl group-hover:from-green-400/30 group-hover:to-cyan-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:from-yellow-400/30 group-hover:to-orange-400/30 transition-all duration-500" />
			<div
				className={`relative flex flex-col min-h-[200px] justify-between ${
					isFetching ? "opacity-40" : ""
				}`}
			>
				<div className="flex items-start justify-between gap-2 mb-4">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">
							가장 많이 사용한 언어 🌈
						</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">
							올해 가장 활발하게 사용한 프로그래밍 언어
						</p>
					</div>
				</div>
				<div className="mt-auto">
					{error && (
						<p className="text-sm text-red-400 font-semibold">오류 발생</p>
					)}

					{!error && data && data.length > 0 && (
						<div className="space-y-3">
							{data.map((lang, index) => (
								<div key={lang.language} className="space-y-1">
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<span className="text-white/80 font-semibold">
												{index + 1}.
											</span>
											<span className="text-white font-bold">
												{lang.language}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-white/60 text-[10px]">
												{lang.count}개 저장소
											</span>
											<span className="text-white font-semibold">
												{lang.percentage}%
											</span>
										</div>
									</div>
									<div className="h-2 bg-white/10 rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
											style={{ width: `${lang.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					)}
					{!error && data && data.length === 0 && (
						<p className="text-xs text-white/60">데이터가 없습니다</p>
					)}
				</div>
			</div>
		</div>
	);
}
