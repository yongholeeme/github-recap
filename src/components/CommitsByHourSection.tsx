import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import InsightSection from '@/components/InsightSection';
import BarChart from '@/components/charts/BarChart';
import Toast from '@/components/Toast';

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
	const { data: commits, isFetching } = useCommitsData(year);
	const [showToast, setShowToast] = useState(false);
	const hasShownToast = useRef(false);
	
	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});
	
	const hourData = useMemo(() => {
		if (!commits) return null;
		const hourCounts = calculateCommitsByHour(commits);
		const peakHours = getPeakHours(hourCounts);
		const recommendation = getTimeRangeRecommendation(peakHours);
		const maxCount = Math.max(...Object.values(hourCounts));
		const totalCommits = Object.values(hourCounts).reduce((a, b) => a + b, 0);
		const activeHours = Object.values(hourCounts).filter(c => c > 0).length;
		const avgPerHour = Math.round(totalCommits / activeHours);
		
		return { hourCounts, peakHours, recommendation, maxCount, avgPerHour };
	}, [commits]);

	useEffect(() => {
		if (hourData?.recommendation && inView) {
			setShowToast(true);
			hasShownToast.current = true;
			
			const dismissTimer = setTimeout(() => setShowToast(false), 5000);
			
			return () => {
				clearTimeout(dismissTimer);
			};
		} else if (!inView && hasShownToast.current) {
			setShowToast(false);
		}
	}, [hourData?.recommendation, inView]);

	if (isFetching || !hourData) {
		return (
			<div className="min-h-screen snap-start flex items-center justify-center">
				<div className="text-white/40 text-xl animate-pulse">분석 중...</div>
			</div>
		);
	}

	const peakHourNums = hourData.peakHours.map(([h]) => Number.parseInt(h));
	const chartData = Object.entries(hourData.hourCounts).map(([hour, count]) => ({
		label: Number.parseInt(hour),
		value: count,
		isPeak: peakHourNums.includes(Number.parseInt(hour))
	}));

	return (
		<div ref={ref} className="relative">
			{/* Toast for recommendation */}
			{hourData.recommendation && (
				<Toast isVisible={showToast} onClose={() => setShowToast(false)}>
					<div className="text-3xl flex-shrink-0">{hourData.recommendation.emoji}</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
							<span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
								인사이트
							</span>
							<span className="ml-auto px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[10px] text-white/90 font-bold">
								{hourData.recommendation.period} 타입
							</span>
						</div>
						<h4 className="text-base font-black text-white mb-1">
							{hourData.recommendation.time}
						</h4>
						<p className="text-xs text-white/70 font-medium line-clamp-2">
							{hourData.recommendation.message}
						</p>
					</div>
				</Toast>
			)}

			<InsightSection
				title="24시간의 흔적"
				subtitle="하루 중 언제 가장 몰입하시나요?"
				chart={<BarChart data={chartData} maxValue={hourData.maxCount} />}
				topItems={hourData.peakHours.map(([hour, count]) => ({
					label: `${hour}시`,
					value: `${count}개`,
					rank: 0
				}))}
				stats={[
					{ label: '최다 커밋', value: hourData.maxCount },
					{ label: '평균 커밋', value: hourData.avgPerHour },
				]}
			/>
		</div>
	);
}
