import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';
import InsightSection from '@/components/InsightSection';
import BarChart from '@/components/charts/BarChart';

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
		const totalCommits = Object.values(hourCounts).reduce((a, b) => a + b, 0);
		const activeHours = Object.values(hourCounts).filter(c => c > 0).length;
		const avgPerHour = Math.round(totalCommits / activeHours);
		const peakConcentration = ((peakHours.reduce((sum, [, count]) => sum + count, 0) / totalCommits) * 100).toFixed(0);
		
		return { hourCounts, peakHours, recommendation, maxCount, activeHours, avgPerHour, peakConcentration };
	}, [commits]);

	if (isLoading || !hourData) {
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
		<InsightSection
			title="24시간의 흔적"
			subtitle="하루 중 언제 가장 몰입하시나요?"
			recommendation={hourData.recommendation ? {
				emoji: hourData.recommendation.emoji,
				title: hourData.recommendation.time,
				subtitle: hourData.recommendation.message,
				badge: `${hourData.recommendation.period} 타입`
			} : undefined}
			chart={<BarChart data={chartData} maxValue={hourData.maxCount} />}
			topItems={hourData.peakHours.map(([hour, count]) => ({
				label: `${hour}시`,
				value: `${count}개`,
				subvalue: '커밋',
				rank: 0
			}))}
			stats={[
				{ label: '활동 시간대', value: hourData.activeHours },
				{ label: '최다 커밋', value: hourData.maxCount },
				{ label: '평균 커밋', value: hourData.avgPerHour },
				{ label: '피크 집중도', value: `${hourData.peakConcentration}%` }
			]}
		/>
	);
}
