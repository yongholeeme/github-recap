import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';
import BarChart from '@/components/charts/BarChart';
import InsightSection from '@/components/InsightSection';

function calculateCommitsByMonth(commits: CommitData) {
	const monthCounts: Record<number, number> = {};
	for (let i = 0; i < 12; i++) {
		monthCounts[i] = 0;
	}

	for (const commit of commits) {
		const date = new Date(commit.committedDate);
		const month = date.getMonth();
		monthCounts[month] = (monthCounts[month] || 0) + 1;
	}

	return monthCounts;
}

function getMonthName(month: number): string {
	return `${month + 1}월`;
}

function getTopMonths(monthCounts: Record<number, number>) {
	return Object.entries(monthCounts)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 3);
}

function getQuarterAnalysis(monthCounts: Record<number, number>) {
	const q1 = monthCounts[0] + monthCounts[1] + monthCounts[2]; // 1-3월
	const q2 = monthCounts[3] + monthCounts[4] + monthCounts[5]; // 4-6월
	const q3 = monthCounts[6] + monthCounts[7] + monthCounts[8]; // 7-9월
	const q4 = monthCounts[9] + monthCounts[10] + monthCounts[11]; // 10-12월
	
	const quarters = [
		{ name: '1분기', value: q1, emoji: '🌱', period: '1-3월' },
		{ name: '2분기', value: q2, emoji: '🌻', period: '4-6월' },
		{ name: '3분기', value: q3, emoji: '🍂', period: '7-9월' },
		{ name: '4분기', value: q4, emoji: '❄️', period: '10-12월' }
	];
	
	const topQuarter = quarters.sort((a, b) => b.value - a.value)[0];
	
	return {
		quarters,
		topQuarter,
		recommendation: {
			emoji: topQuarter.emoji,
			title: `${topQuarter.name} (${topQuarter.period})`,
			subtitle: `${topQuarter.name}에 가장 왕성하게 활동하셨네요! ${topQuarter.value}개의 커밋으로 최고 기록을 달성했습니다`,
			badge: '최고 분기'
		}
	};
}

export default function CommitTimelineSection() {
	const { year } = useYear();
	const { data: commits, isLoading } = useCommitsData(year);
	
	const timelineData = useMemo(() => {
		if (!commits) return null;
		const monthCounts = calculateCommitsByMonth(commits);
		const topMonths = getTopMonths(monthCounts);
		const quarterAnalysis = getQuarterAnalysis(monthCounts);
		const totalCommits = Object.values(monthCounts).reduce((a, b) => a + b, 0);
		const activeMonths = Object.values(monthCounts).filter(c => c > 0).length;
		const avgPerMonth = Math.round(totalCommits / activeMonths);
		
		return { monthCounts, topMonths, quarterAnalysis, totalCommits, activeMonths, avgPerMonth };
	}, [commits]);

	if (isLoading || !timelineData) {
		return (
			<div className="min-h-screen snap-start flex items-center justify-center">
				<div className="text-white/40 text-xl animate-pulse">분석 중...</div>
			</div>
		);
	}

	const maxMonth = timelineData.topMonths[0];
	const peakRate = ((Number(maxMonth[1]) / timelineData.totalCommits) * 100).toFixed(0);

	const maxCount = Math.max(...Object.values(timelineData.monthCounts));
	const chartData = Object.entries(timelineData.monthCounts).map(([month, count]) => ({
		label: getMonthName(Number.parseInt(month)),
		value: count,
		isPeak: count === maxCount
	}));

	return (
		<InsightSection
			title="12개월의 여정"
			subtitle="한 해 동안 당신의 개발 스토리"
			recommendation={timelineData.quarterAnalysis.recommendation}
			chart={<BarChart data={chartData} maxValue={maxCount} height={320} barHeight={280} />}
			topItems={timelineData.topMonths.map(([month, count]) => ({
				label: getMonthName(Number.parseInt(month)),
				value: `${count}개`,
				subvalue: '커밋',
				rank: 0
			}))}
			stats={[
				{ label: '활동 개월', value: `${timelineData.activeMonths}/12` },
				{ label: '월평균 커밋', value: timelineData.avgPerMonth },
				{ label: '최고 기록', value: `${maxMonth[1]}개` },
				{ label: '피크 집중도', value: `${peakRate}%` }
			]}
		/>
	);
}
