import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';

function calculateCommitsByHour(commits: CommitData) {
	const hourCounts: Record<number, number> = {};
	for (let i = 0; i < 24; i++) {
		hourCounts[i] = 0;
	}

	for (const commit of commits) {
		const date = new Date(commit.committedDate);
		const hour = date.getHours();
		hourCounts[hour] = (hourCounts[hour] || 0) + 1;
	}

	return hourCounts;
}

function getPeakHours(hourCounts: Record<number, number>) {
	const sortedHours = Object.entries(hourCounts)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 3);
	
	return sortedHours;
}

function getTimeRangeRecommendation(peakHours: Array<[string, number]>) {
	if (peakHours.length === 0) return null;
	
	const topHour = Number.parseInt(peakHours[0][0]);
	
	// 시간대별 추천 메시지
	if (topHour >= 6 && topHour < 12) {
		return {
			period: '아침',
			emoji: '🌅',
			message: '아침형 개발자시네요! 상쾌한 아침 시간을 활용하세요',
			time: `${topHour}시-${topHour + 3}시`
		};
	}
	if (topHour >= 12 && topHour < 18) {
		return {
			period: '오후',
			emoji: '☀️',
			message: '오후에 집중력이 최고조! 점심 이후 시간을 활용하세요',
			time: `${topHour}시-${topHour + 3}시`
		};
	}
	if (topHour >= 18 && topHour < 24) {
		return {
			period: '저녁',
			emoji: '🌙',
			message: '야행성 개발자! 저녁에 가장 생산적입니다',
			time: `${topHour}시-${(topHour + 3) % 24}시`
		};
	}
	return {
		period: '새벽',
		emoji: '🦉',
		message: '진정한 밤의 코더! 고요한 새벽이 당신의 시간입니다',
		time: `${topHour}시-${topHour + 3}시`
	};
}

export default function CommitsByHourSection() {
	const { year } = useYear();
	const { data: commits, isLoading } = useCommitsData(year);
	
	const hourData = useMemo(() => {
		if (!commits) return null;
		const hourCounts = calculateCommitsByHour(commits);
		const peakHours = getPeakHours(hourCounts);
		const recommendation = getTimeRangeRecommendation(peakHours);
		const maxCount = Math.max(...Object.values(hourCounts));
		
		console.log('Hour Data:', { hourCounts, peakHours, maxCount, totalCommits: commits.length });
		
		return { hourCounts, peakHours, recommendation, maxCount };
	}, [commits]);

	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.02em] mb-4">
						24시간의 흔적
					</h2>
					<p className="text-base sm:text-lg text-white/50 font-medium">
						하루 중 언제 가장 몰입하시나요?
					</p>
				</div>

				{isLoading ? (
					<div className="flex items-center justify-center py-20">
						<div className="text-white/40 text-xl animate-pulse">분석 중...</div>
					</div>
				) : hourData ? (
					<>
						{/* Recommendation Card */}
						{hourData.recommendation && (
							<div className="mb-10 sm:mb-14">
								<div className="relative bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 overflow-hidden">
									{/* Animated background glow */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
									
									<div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
										<div className="flex items-center gap-4 sm:gap-6">
											<div className="text-5xl sm:text-6xl flex-shrink-0">{hourData.recommendation.emoji}</div>
											<div className="text-center sm:text-left">
												<div className="inline-flex items-center gap-2 mb-2">
													<div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
													<span className="text-xs sm:text-sm text-cyan-300 font-bold uppercase tracking-wider">
														최적 작업 시간
													</span>
												</div>
												<h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
													{hourData.recommendation.time}
												</h3>
												<p className="text-sm sm:text-base text-white/70 font-medium">
													{hourData.recommendation.message}
												</p>
											</div>
										</div>
										
										<div className="flex-shrink-0 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
											<span className="text-sm sm:text-base text-white/90 font-bold">
												{hourData.recommendation.period} 타입
											</span>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Enhanced Bar Chart */}
						<div className="space-y-8">
							<div className="flex items-end justify-between gap-1 sm:gap-2" style={{ height: '384px' }}>
								{Object.entries(hourData.hourCounts).map(([hour, count]) => {
									const percentage = hourData.maxCount > 0 ? (count / hourData.maxCount) * 100 : 0;
									const minHeight = count > 0 ? 4 : 0; // 최소 4% 높이
									const barHeight = Math.max(percentage, minHeight);
									const hourNum = Number.parseInt(hour);
									const isPeak = hourData.peakHours.some(([h]) => Number.parseInt(h) === hourNum);
									
									return (
										<div key={hour} className="flex flex-col items-center gap-2 group" style={{ flex: '1 1 0%', minWidth: 0 }}>
											{/* Bar Container */}
											<div className="relative w-full" style={{ height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
												{count > 0 ? (
													<div
														className={`w-full rounded-t-lg transition-all duration-500 relative ${
															isPeak
																? 'bg-gradient-to-t from-blue-400 to-cyan-300 shadow-lg shadow-blue-500/50'
																: 'bg-gradient-to-t from-blue-600/60 to-blue-400/60'
														} hover:opacity-80`}
														style={{ height: `${barHeight}%`, minHeight: count > 0 ? '8px' : '0' }}
													>
														{/* Glow effect for peak hours */}
														{isPeak && (
															<div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-blue-400 to-cyan-300 blur-md opacity-50" style={{ zIndex: -1 }} />
														)}
													</div>
												) : (
													<div className="w-full bg-white/10 rounded" style={{ height: '2px' }} />
												)}
												
												{/* Count on hover */}
												{count > 0 && (
													<div className="absolute left-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap" style={{ bottom: '100%', marginBottom: '4px', transform: 'translateX(-50%)', zIndex: 10 }}>
														{count}개
													</div>
												)}
											</div>
											
											{/* Hour label */}
											<div className={`text-xs sm:text-sm font-medium ${
												isPeak ? 'text-cyan-300 font-bold' : 'text-white/50'
											}`}>
												{hourNum}
											</div>
										</div>
									);
								})}
							</div>

							{/* Peak hours legend */}
							<div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
								{hourData.peakHours.map(([hour, count], index) => {
									const medals = ['🥇', '🥈', '🥉'];
									const colors = [
										'from-yellow-400/20 to-amber-400/20 border-yellow-400/30',
										'from-gray-300/20 to-gray-400/20 border-gray-300/30',
										'from-orange-400/20 to-amber-600/20 border-orange-400/30'
									];
									
									return (
										<div key={hour} className={`relative bg-gradient-to-br ${colors[index]} backdrop-blur-sm border rounded-2xl p-4 text-center transition-transform hover:scale-105`}>
											<div className="text-3xl mb-2">{medals[index]}</div>
											<div className="text-2xl sm:text-3xl font-black text-white mb-1">
												{hour}<span className="text-lg">시</span>
											</div>
											<div className="text-sm sm:text-base text-white/60 font-medium">
												{count}개 커밋
											</div>
											{index === 0 && (
												<div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-black px-2 py-1 rounded-full shadow-lg">
													PEAK
												</div>
											)}
										</div>
									);
								})}
							</div>

							{/* Stats summary */}
							<div className="mt-10 pt-8 border-t border-white/10">
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
									<div className="text-center">
										<div className="text-3xl sm:text-4xl font-black text-white mb-1">
											{Object.values(hourData.hourCounts).filter(c => c > 0).length}
										</div>
										<div className="text-xs sm:text-sm text-white/50 font-medium">
											활동 시간대
										</div>
									</div>
									<div className="text-center">
										<div className="text-3xl sm:text-4xl font-black text-white mb-1">
											{hourData.maxCount}
										</div>
										<div className="text-xs sm:text-sm text-white/50 font-medium">
											최다 커밋
										</div>
									</div>
									<div className="text-center">
										<div className="text-3xl sm:text-4xl font-black text-white mb-1">
											{Math.round((Object.values(hourData.hourCounts).reduce((a, b) => a + b, 0) / Object.values(hourData.hourCounts).filter(c => c > 0).length) || 0)}
										</div>
										<div className="text-xs sm:text-sm text-white/50 font-medium">
											평균 커밋
										</div>
									</div>
									<div className="text-center">
										<div className="text-3xl sm:text-4xl font-black text-white mb-1">
											{(hourData.peakHours.reduce((sum, [, count]) => sum + count, 0) / Object.values(hourData.hourCounts).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%
										</div>
										<div className="text-xs sm:text-sm text-white/50 font-medium">
											피크 집중도
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="text-center text-white/40 py-20">
						데이터가 없습니다
					</div>
				)}
			</div>
		</div>
	);
}
