import { useQueryClient } from "@tanstack/react-query";
import { getLastYearStats } from '@/lib/github';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { CountUpAnimation } from '@/components/CountUpAnimation';
import { queryKeys } from '@/lib/queryKeys';

export default function GrowthSection() {
	const queryClient = useQueryClient();

	// 작년 데이터만 가져오기 (4개 요청)
	const { data: lastYearData, isLoading, isFetching, ref } = useInViewQuery({
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

	const growthData =
		!lastYearData ||
		currentCommits === undefined ||
		currentPRs === undefined ||
		currentIssues === undefined ||
		currentReviews === undefined
			? undefined
			: [
					{
						title: "커밋",
						icon: "💻",
						current: currentCommits,
						last: lastYearData.commits,
						growth: calculateGrowth(currentCommits, lastYearData.commits),
					},
					{
						title: "Pull Request",
						icon: "🔀",
						current: currentPRs,
						last: lastYearData.prs,
						growth: calculateGrowth(currentPRs, lastYearData.prs),
					},
					{
						title: "이슈",
						icon: "🎯",
						current: currentIssues,
						last: lastYearData.issues,
						growth: calculateGrowth(currentIssues, lastYearData.issues),
					},
					{
						title: "리뷰",
						icon: "👀",
						current: currentReviews,
						last: lastYearData.reviews,
						growth: calculateGrowth(currentReviews, lastYearData.reviews),
					},
			  ];

	const getGrowthColor = (growth: number) => {
		if (growth > 0) return "from-green-400 to-emerald-500";
		if (growth < 0) return "from-red-400 to-rose-500";
		return "from-gray-400 to-slate-500";
	};

	const getGrowthIcon = (growth: number) => {
		if (growth > 0) return "↗";
		if (growth < 0) return "↘";
		return "→";
	};

	const getGrowthBg = (growth: number) => {
		if (growth > 0) return "from-green-500/20 to-emerald-600/20";
		if (growth < 0) return "from-red-500/20 to-rose-600/20";
		return "from-gray-500/20 to-slate-600/20";
	};

	return (
		<div ref={ref} className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			{/* Section Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
				{/* Section Header */}
				<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600 rounded-2xl sm:rounded-3xl shadow-2xl">
						<span className="text-3xl sm:text-4xl md:text-5xl">📈</span>
					</div>
					<div>
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">
							전년 대비 성장률
						</h3>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">
							작년 같은 기간 대비 당신의 성장
						</p>
					</div>
				</div>

				{/* Growth Cards */}
				{isLoading || !growthData ? (
					<div className="flex items-center justify-center py-20">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 border-4 border-white/60 border-t-transparent rounded-full animate-spin" />
							<p className="text-xl text-white/60">데이터 분석 중...</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
						{growthData.map((item, index) => (
							<div
								key={item.title}
								className={`group relative bg-gradient-to-br ${getGrowthBg(
									item.growth
								)} border-2 border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
									isFetching ? "opacity-60" : ""
								}`}
								style={{
									animationDelay: `${index * 100}ms`,
								}}
							>
								{isFetching && (
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
								)}

								{/* Background Decorations */}
								<div
									className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${getGrowthBg(
										item.growth
									)} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500`}
								/>
								<div
									className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${getGrowthBg(
										item.growth
									)} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-500`}
								/>

								<div className="relative">
									{/* Icon & Title */}
									<div className="flex items-center gap-3 mb-6">
										<span className="text-4xl sm:text-5xl">{item.icon}</span>
										<h4 className="text-2xl sm:text-3xl font-black text-white">
											{item.title}
										</h4>
									</div>

									{/* Growth Percentage - Large Display */}
									<div className="mb-6">
										<div className="flex items-baseline gap-2 mb-2">
											<span
												className={`text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r ${getGrowthColor(
													item.growth
												)} bg-clip-text text-transparent drop-shadow-lg`}
											>
												{getGrowthIcon(item.growth)}{" "}
												<CountUpAnimation value={Math.abs(item.growth)} />
											</span>
											<span
												className={`text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r ${getGrowthColor(
													item.growth
												)} bg-clip-text text-transparent`}
											>
												%
											</span>
										</div>
										<p className="text-sm sm:text-base text-white/60 font-medium">
											{item.growth > 0 && "성장했어요! 🎉"}
											{item.growth < 0 && "다음엔 더 잘할 수 있어요 💪"}
											{item.growth === 0 && "변동 없음"}
										</p>
									</div>

									{/* Comparison Stats */}
									<div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
										<div className="space-y-1">
											<p className="text-xs sm:text-sm text-white/50 font-medium">
												올해
											</p>
											<p className="text-2xl sm:text-3xl font-black text-white">
												<CountUpAnimation value={item.current} duration={1200} />
											</p>
										</div>
										<div className="space-y-1">
											<p className="text-xs sm:text-sm text-white/50 font-medium">
												작년
											</p>
											<p className="text-2xl sm:text-3xl font-black text-white/70">
												<CountUpAnimation value={item.last} duration={1200} />
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
