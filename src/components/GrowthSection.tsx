import { CountUpAnimation } from '@/components/CountUpAnimation';
import { useYear } from '@/contexts/YearContext';
import { useCountOfMyCreatedPrs } from "@/lib/hooks/useCountOfMyCreatedPrs";
import { useCountOfPrsReviewedByMe } from "@/lib/hooks/useCountOfPrsReviewedByMe";
import { useCountOfCommits } from "@/lib/hooks/useCountOfCommits";
import { useCountOfParticipatedIssues } from '@/lib/hooks/useCountOfParticipatedIssues';

export default function GrowthSection() {
	const { year } = useYear();


	const { data: currentCommits, isFetching: isFetchingCurrentCommits } = useCountOfCommits(year);
	const {	data: lastCommits, isFetching: isFetchingLastCommits } = useCountOfCommits(year- 1);
	const {data: currentMyCreatedPrs, isFetching: isFetchingCurrentMyCreatedPrs} = useCountOfMyCreatedPrs(year);
	const {data: lastMyCreatedPrs, isFetching: isFetchingLastMyCreatedPrs} = useCountOfMyCreatedPrs(year - 1);
	const {data: currentPrsReviewedByMe, isFetching: isFetchingCurrentPrsReviewedByMe} = useCountOfPrsReviewedByMe(year);
	const {data: lastPrsReviewedByMe, isFetching: isFetchingLastPrsReviewedByMe} = useCountOfPrsReviewedByMe(year - 1);
	const { data: currentParticipatedIssues, isFetching: isFetchingCurrentParticipatedIssues } = useCountOfParticipatedIssues(year);
	const { data: lastParticipatedIssues, isFetching: isFetchingLastParticipatedIssues } = useCountOfParticipatedIssues(year - 1);

	const isFetching = isFetchingCurrentCommits || isFetchingLastCommits ||
		isFetchingCurrentMyCreatedPrs || isFetchingLastMyCreatedPrs ||
		isFetchingCurrentPrsReviewedByMe || isFetchingLastPrsReviewedByMe ||
		isFetchingCurrentParticipatedIssues || isFetchingLastParticipatedIssues;
		
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
		currentCommits === undefined || lastCommits === undefined ||
		currentMyCreatedPrs === undefined || lastMyCreatedPrs === undefined || 
		currentParticipatedIssues === undefined ||lastParticipatedIssues === undefined ||
		currentPrsReviewedByMe === undefined || lastPrsReviewedByMe === undefined
			? undefined
			: [
					{
						title: "커밋",
						icon: "💻",
						current: currentCommits,
						last: lastCommits,
						change: calculateChange(currentCommits, lastCommits),
						changeRate: calculateChangeRate(currentCommits, lastCommits),
					},
					{
						title: "생성한 Pull Request",
						icon: "🔀",
						current: currentMyCreatedPrs,
						last: lastMyCreatedPrs,
						change: calculateChange(currentMyCreatedPrs, lastMyCreatedPrs),
						changeRate: calculateChangeRate(currentMyCreatedPrs, lastMyCreatedPrs),
					},
					{
						title: "리뷰한 Pull Request",
						icon: "👀",
						current: currentPrsReviewedByMe,
						last: lastPrsReviewedByMe,
						change: calculateChange(currentPrsReviewedByMe, lastPrsReviewedByMe),
						changeRate: calculateChangeRate(currentPrsReviewedByMe, lastPrsReviewedByMe),
					},
					{
						title: "이슈 & 디스커션",
						icon: "🎯",
						current: currentParticipatedIssues,
						last: lastParticipatedIssues,
						change: calculateChange(currentParticipatedIssues, lastParticipatedIssues),
						changeRate: calculateChangeRate(currentParticipatedIssues, lastParticipatedIssues),
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
		<section className="snap-start min-h-screen flex items-center justify-center p-8">
			<div className="max-w-6xl w-full">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
						작년과 비교해볼까요?
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						같은 기간, 숫자로 보는 변화
					</p>
				</div>

				{/* Comparison Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{(comparisonData || [
						{ title: "커밋", icon: "💻", current: 0, last: 0, change: 0, changeRate: 0 },
						{ title: "생성한 Pull Request", icon: "🔀", current: 0, last: 0, change: 0, changeRate: 0 },
						{ title: "리뷰한 Pull Request", icon: "👀", current: 0, last: 0, change: 0, changeRate: 0 },
						{ title: "이슈 & 디스커션", icon: "🎯", current: 0, last: 0, change: 0, changeRate: 0 },
					]).map((item) => (
						<div
							key={item.title}
							className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 border backdrop-blur-sm ${
								isFetching ? "opacity-60" : ""
							}`}
							style={{
								background: `linear-gradient(135deg, ${getChangeBg(item.change)})`,
								borderColor: item.change > 0 ? '#3b82f640' : item.change < 0 ? '#f5970640' : '#6b728040',
								boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
							}}
						>
							{isFetching && (
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
							)}

							{/* Background glow on hover */}
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background: `radial-gradient(circle at center, ${item.change > 0 ? '#3b82f608' : item.change < 0 ? '#f5970608' : '#6b728008'}, transparent 70%)`,
								}}
							/>

							<div className="relative">
								{/* Icon & Title */}
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-3">
										<span className="text-3xl">{item.icon}</span>
										<h3 className="text-lg font-bold text-white">
											{item.title}
										</h3>
									</div>
								</div>

								{/* Year Comparison - Side by Side */}
								<div className="grid grid-cols-2 gap-6 mb-6">
									{/* 올해 */}
									<div className="space-y-1">
										<p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
											{year}년
										</p>
										<p className="text-4xl font-black text-white">
											<CountUpAnimation value={item.current} duration={1200} />
										</p>
									</div>

									{/* 작년 */}
									<div className="space-y-1">
										<p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
											{year - 1}년
										</p>
										<p className="text-4xl font-black text-white/40">
											<CountUpAnimation value={item.last} duration={1200} />
										</p>
									</div>
								</div>

								{/* Change Indicator - Enhanced */}
								<div className="pt-6 border-t border-white/10">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
											변화량
										</span>
										<div className="flex items-center gap-2">
											<span
												className={`text-3xl font-black bg-gradient-to-r ${getChangeColor(
													item.change
												)} bg-clip-text text-transparent`}
											>
												{getChangeIcon(item.change)}
												<CountUpAnimation value={Math.abs(item.change)} />
											</span>
											<span
												className="text-lg font-bold px-2 py-1 rounded-lg"
												style={{
													background: item.change > 0 ? '#3b82f620' : item.change < 0 ? '#f5970620' : '#6b728020',
													color: item.change > 0 ? '#60a5fa' : item.change < 0 ? '#fbbf24' : '#9ca3af',
												}}
											>
												{getChangeIcon(item.changeRate)}
												{Math.abs(item.changeRate)}%
											</span>
										</div>
									</div>
								</div>

								{/* Progress bar */}
								{item.last > 0 && (
									<div className="mt-4">
										<div className="relative w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
											<div
												className="h-full rounded-full transition-all duration-700 ease-out"
												style={{
													width: `${Math.min((item.current / (item.last * 2)) * 100, 100)}%`,
													background: item.change > 0
														? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
														: item.change < 0
															? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
															: 'linear-gradient(90deg, #6b7280, #9ca3af)',
												}}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<style>{`
				@keyframes shimmer {
					0% { transform: translateX(-100%); }
					100% { transform: translateX(100%); }
				}
				.animate-shimmer {
					animation: shimmer 2s infinite;
				}
			`}</style>
		</section>
	);
}
