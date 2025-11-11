import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLastYearStats } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function YearOverYearGrowthCard() {
	const queryClient = useQueryClient();

	// 작년 데이터만 가져오기 (4개 요청)
	const { data: lastYearData, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.stats.lastYear(),
		queryFn: () => getLastYearStats(),
		
	});

	// 올해 데이터는 캐시에서 가져오기 (0개 요청)
	const currentCommits = queryClient.getQueryData<number>(queryKeys.commits.all());
	const currentPRs = queryClient.getQueryData<number>(queryKeys.pullRequests.all());
	const currentIssues = queryClient.getQueryData<number>(queryKeys.issues.all());
	const currentReviews = queryClient.getQueryData<number>(queryKeys.pullRequests.reviews());

	// 성장률 계산
	const calculateGrowth = (current: number, last: number): number => {
		if (last === 0) return current > 0 ? 100 : 0;
		return Math.round(((current - last) / last) * 100);
	};

	const data =
		!lastYearData ||
		currentCommits === undefined ||
		currentPRs === undefined ||
		currentIssues === undefined ||
		currentReviews === undefined
			? undefined
			: {
					commits: calculateGrowth(currentCommits, lastYearData.commits),
					prs: calculateGrowth(currentPRs, lastYearData.prs),
					issues: calculateGrowth(currentIssues, lastYearData.issues),
					reviews: calculateGrowth(currentReviews, lastYearData.reviews),
			  };

	const handleRefresh = () => {
		refetch();
	};

	const getGrowthColor = (growth: number) => {
		if (growth > 0) return "text-green-400";
		if (growth < 0) return "text-red-400";
		return "text-white/60";
	};

	const getGrowthIcon = (growth: number) => {
		if (growth > 0) return "↗";
		if (growth < 0) return "↘";
		return "→";
	};

	return (
		<div
			className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
				isFetching ? "pointer-events-none" : ""
			}`}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl group-hover:from-emerald-400/30 group-hover:to-teal-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lime-400/20 to-green-400/20 rounded-full blur-2xl group-hover:from-lime-400/30 group-hover:to-green-400/30 transition-all duration-500" />
			<div
				className={`relative flex flex-col min-h-[200px] justify-between ${
					isFetching ? "opacity-40" : ""
				}`}
			>
				<div className="flex items-start justify-between gap-2 mb-4">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">
							전년 대비 성장률 📈
						</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">
							작년 같은 기간 대비 활동 증감률
						</p>
					</div>
					<button
						type="button"
						onClick={handleRefresh}
						disabled={isFetching}
						className="flex-shrink-0 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
						title="새로고침"
					>
						<svg
							className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-auto">
					{error && (
						<p className="text-sm text-red-400 font-semibold">오류 발생</p>
					)}
					{!error && isLoading && (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
							<p className="text-xs text-white/60">로딩 중...</p>
						</div>
					)}
					{!error && data && (
						<div className="grid grid-cols-2 gap-3">
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
								<p className="text-[10px] text-white/60 mb-1">커밋</p>
								<div className="flex items-center gap-1">
									<span
										className={`text-2xl font-black ${getGrowthColor(
											data.commits
										)}`}
									>
										{getGrowthIcon(data.commits)} {Math.abs(data.commits)}%
									</span>
								</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
								<p className="text-[10px] text-white/60 mb-1">PR</p>
								<div className="flex items-center gap-1">
									<span
										className={`text-2xl font-black ${getGrowthColor(
											data.prs
										)}`}
									>
										{getGrowthIcon(data.prs)} {Math.abs(data.prs)}%
									</span>
								</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
								<p className="text-[10px] text-white/60 mb-1">이슈</p>
								<div className="flex items-center gap-1">
									<span
										className={`text-2xl font-black ${getGrowthColor(
											data.issues
										)}`}
									>
										{getGrowthIcon(data.issues)} {Math.abs(data.issues)}%
									</span>
								</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3">
								<p className="text-[10px] text-white/60 mb-1">리뷰</p>
								<div className="flex items-center gap-1">
									<span
										className={`text-2xl font-black ${getGrowthColor(
											data.reviews
										)}`}
									>
										{getGrowthIcon(data.reviews)} {Math.abs(data.reviews)}%
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
