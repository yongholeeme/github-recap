import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';
import BarChart from '@/components/charts/BarChart';
import InsightSection from '@/components/InsightSection';
import { useCommits } from '@/lib/hooks/useCommits';

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

export default function CommitTimelineSection() {
	const { year } = useYear();
	const { data: commits, isFetching } = useCommits(year);
	
	const timelineData = useMemo(() => {
		if (!commits) return null;
		const monthCounts = calculateCommitsByMonth(commits);
		const topMonths = getTopMonths(monthCounts);
		const totalCommits = Object.values(monthCounts).reduce((a, b) => a + b, 0);
		const activeMonths = Object.values(monthCounts).filter(c => c > 0).length;
		const avgPerMonth = Math.round(totalCommits / activeMonths);
		
		return { monthCounts, topMonths, totalCommits, activeMonths, avgPerMonth };
	}, [commits]);

	const maxMonth = timelineData?.topMonths[0];
	const maxCount = timelineData ? Math.max(...Object.values(timelineData.monthCounts)) : 0;
	const chartData = timelineData 
		? Object.entries(timelineData.monthCounts).map(([month, count]) => ({
			label: getMonthName(Number.parseInt(month)),
			value: count,
			isPeak: count === maxCount
		}))
		: Array.from({ length: 12 }, (_, i) => ({
			label: getMonthName(i),
			value: 0,
			isPeak: false
		}));

	return (
		<InsightSection
			title="12개월의 여정"
			subtitle="한 해 동안 당신의 개발 스토리"
			chart={<BarChart data={chartData} maxValue={maxCount} height={320} barHeight={280} />}
			topItems={timelineData?.topMonths.map(([month, count]) => ({
				label: getMonthName(Number.parseInt(month)),
				value: `${count}개`,
				rank: 0
			})) || []}
			stats={[
				{ label: '활동 개월', value: timelineData ? `${timelineData.activeMonths}/12` : '-' },
				{ label: '월평균 커밋', value: timelineData?.avgPerMonth || '-' },
				{ label: '최고 기록', value: maxMonth ? `${maxMonth[1]}개` : '-' },
			]}
			isFetching={isFetching}
		/>
	);
}
