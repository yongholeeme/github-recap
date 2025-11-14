import { useQueryClient } from "@tanstack/react-query";
import { getLastYearStats } from '@/lib/github/stats';;
import { useQuery } from '@tanstack/react-query';
import { CountUpAnimation } from '@/components/CountUpAnimation';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function GrowthSection() {
	const { year } = useYear();
	const queryClient = useQueryClient();

	// 작년 데이터만 가져오기 (4개 요청)
	const { data: lastYearData, isLoading, isFetching } = useQuery({
		queryKey: queryKeys.stats.lastYear(year),
		queryFn: () => getLastYearStats(year),
	});

	// 올해 데이터는 캐시에서 가져오기 (0개 요청)
	const currentCommits = queryClient.getQueryData<number>(queryKeys.commits.all(year));
	const currentPRs = queryClient.getQueryData<number>(queryKeys.pullRequests.all(year));
	const currentIssues = queryClient.getQueryData<number>(queryKeys.issues.all(year));
	const currentReviews = queryClient.getQueryData<number>(queryKeys.pullRequests.reviews(year));

	// 변화량 계산
	const calculateChange = (current: number, last: number): number => {
		return current - last;
	};

	// 변화율 계산
	const calculateChangeRate = (current: number, last: number): number => {
		if (last === 0) return current > 0 ? 100 : 0;
		return Math.round(((current - last) / last) * 100);
	};

	const comparisonData =
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
						change: calculateChange(currentCommits, lastYearData.commits),
						changeRate: calculateChangeRate(currentCommits, lastYearData.commits),
					},
					{
						title: "Pull Request",
						icon: "🔀",
						current: currentPRs,
						last: lastYearData.prs,
						change: calculateChange(currentPRs, lastYearData.prs),
						changeRate: calculateChangeRate(currentPRs, lastYearData.prs),
					},
					{
						title: "이슈",
						icon: "🎯",
						current: currentIssues,
						last: lastYearData.issues,
						change: calculateChange(currentIssues, lastYearData.issues),
						changeRate: calculateChangeRate(currentIssues, lastYearData.issues),
					},
					{
						title: "리뷰",
						icon: "👀",
						current: currentReviews,
						last: lastYearData.reviews,
						change: calculateChange(currentReviews, lastYearData.reviews),
						changeRate: calculateChangeRate(currentReviews, lastYearData.reviews),
					},
			  ];

	const getChangeColor = (change: number) => {
		if (change > 0) return "from-blue-400 to-cyan-500";
		if (change < 0) return "from-orange-400 to-amber-500";
		return "from-gray-400 to-slate-500";
	};

	const getChangeIcon = (change: number) => {
		if (change > 0) return "+";
		if (change < 0) return "";
		return "±";
	};

	const getChangeBg = (change: number) => {
		if (change > 0) return "from-blue-500/10 to-cyan-600/10";
		if (change < 0) return "from-orange-500/10 to-amber-600/10";
		return "from-gray-500/10 to-slate-600/10";
	};

	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						작년과
						<br />
						비교해볼까요?
					</h2>
					<p className="text-lg sm:text-xl text-gray-400 font-medium">
						같은 기간, 숫자로 보는 변화
					</p>
				</div>

				{/* Comparison Cards */}
				{isLoading || !comparisonData ? (
					<div className="flex items-center justify-center py-20">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 border-4 border-white/60 border-t-transparent rounded-full animate-spin" />
							<p className="text-xl text-white/60">데이터 분석 중...</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
						{comparisonData.map((item, index) => (
							<div
								key={item.title}
								className={`group relative bg-gradient-to-br ${getChangeBg(
									item.change
								)} border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden backdrop-blur-sm ${
									isFetching ? "opacity-60" : ""
								}`}
								style={{
									animationDelay: `${index * 100}ms`,
								}}
							>
								{isFetching && (
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] z-10" />
								)}

								<div className="relative">
									{/* Icon & Title */}
									<div className="flex items-center gap-3 mb-8">
										<span className="text-3xl sm:text-4xl">{item.icon}</span>
										<h4 className="text-xl sm:text-2xl font-bold text-white/90">
											{item.title}
										</h4>
									</div>

									{/* Main Comparison */}
									<div className="space-y-6 mb-8">
										{/* 올해 */}
										<div className="space-y-2">
											<p className="text-sm text-white/40 font-medium">
												2025년
											</p>
											<p className="text-5xl sm:text-6xl font-black text-white">
												<CountUpAnimation value={item.current} duration={1200} />
											</p>
										</div>

										{/* 작년 */}
										<div className="space-y-2">
											<p className="text-sm text-white/40 font-medium">
												2024년
											</p>
											<p className="text-4xl sm:text-5xl font-bold text-white/50">
												<CountUpAnimation value={item.last} duration={1200} />
											</p>
										</div>
									</div>

									{/* Change Indicator */}
									<div className="pt-6 border-t border-white/10">
										<div className="flex items-center justify-between">
											<span className="text-sm text-white/50 font-medium">
												변화량
											</span>
											<div className="flex items-baseline gap-1">
												<span
													className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${getChangeColor(
														item.change
													)} bg-clip-text text-transparent`}
												>
													{getChangeIcon(item.change)}
													<CountUpAnimation value={Math.abs(item.change)} />
												</span>
												<span className="text-sm text-white/40 ml-2">
													({getChangeIcon(item.changeRate)}
													{Math.abs(item.changeRate)}%)
												</span>
											</div>
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
