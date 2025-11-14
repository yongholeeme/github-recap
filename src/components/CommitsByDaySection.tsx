import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';
import BarChart from '@/components/charts/BarChart';
import InsightSection from '@/components/InsightSection';

function calculateCommitsByDay(commits: CommitData) {
	const dayCounts: Record<number, number> = {};
	for (let i = 0; i < 7; i++) {
		dayCounts[i] = 0;
	}

	for (const commit of commits) {
		const date = new Date(commit.committedDate);
		const day = date.getDay();
		dayCounts[day] = (dayCounts[day] || 0) + 1;
	}

	return dayCounts;
}

function getDayName(day: number): string {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	return days[day];
}

function getTopDays(dayCounts: Record<number, number>) {
	return Object.entries(dayCounts)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 3);
}

function getDayTypeRecommendation(topDay: number) {
	if (topDay === 0 || topDay === 6) {
		return {
			emoji: '🏖️',
			title: '주말 코더',
			subtitle: '주말에 가장 활발하게 활동하시네요! 여유로운 시간을 잘 활용하고 계십니다',
			badge: '주말 타입'
		};
	}
	if (topDay >= 1 && topDay <= 5) {
		return {
			emoji: '💼',
			title: '평일 워커',
			subtitle: '평일에 꾸준히 작업하시는군요! 규칙적인 개발 습관이 돋보입니다',
			badge: '평일 타입'
		};
	}
	return null;
}

export default function CommitsByDaySection() {
	const { year } = useYear();
	const { data: commits, isLoading } = useCommitsData(year);
	
	const dayData = useMemo(() => {
		if (!commits) return null;
		const dayCounts = calculateCommitsByDay(commits);
		const topDays = getTopDays(dayCounts);
		const topDayNum = Number.parseInt(topDays[0][0]);
		const recommendation = getDayTypeRecommendation(topDayNum);
		const totalCommits = Object.values(dayCounts).reduce((a, b) => a + b, 0);
		
		return { dayCounts, topDays, recommendation, totalCommits };
	}, [commits]);

	if (isLoading || !dayData) {
		return (
			<div className="min-h-screen snap-start flex items-center justify-center">
				<div className="text-white/40 text-xl animate-pulse">분석 중...</div>
			</div>
		);
	}

	const weekdayCommits = [1, 2, 3, 4, 5].reduce((sum, day) => sum + dayData.dayCounts[day], 0);
	const weekendCommits = dayData.dayCounts[0] + dayData.dayCounts[6];

	const maxCount = Math.max(...Object.values(dayData.dayCounts));
	const chartData = Object.entries(dayData.dayCounts).map(([day, count]) => ({
		label: getDayName(Number.parseInt(day)),
		value: count,
		isPeak: count === maxCount
	}));

	return (
		<InsightSection
			title="7일의 패턴"
			subtitle="일주일 동안 어떤 리듬으로 작업하셨나요?"
			recommendation={dayData.recommendation || undefined}
			chart={<BarChart data={chartData} maxValue={maxCount} height={320} barHeight={280} />}
			topItems={dayData.topDays.map(([day, count]) => ({
				label: `${getDayName(Number.parseInt(day))}요일`,
				value: `${count}개`,
				subvalue: '커밋',
				rank: 0
			}))}
			stats={[
				{ label: '평일 커밋', value: weekdayCommits },
				{ label: '주말 커밋', value: weekendCommits },
			]}
		/>
	);
}
