import { useYear } from '@/contexts/YearContext';
import { type CommitData } from '@/lib/github/commits';
import { useMemo } from 'react';
import BarChart from '@/components/charts/BarChart';
import InsightSection from '@/components/InsightSection';
import { useCommits } from '@/lib/hooks/useCommits';

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

export default function CommitsByDaySection() {
	const { year } = useYear();
	const { data: commits, isFetching } = useCommits(year);
	
	const dayData = useMemo(() => {
		if (!commits) return null;
		const dayCounts = calculateCommitsByDay(commits);
		const topDays = getTopDays(dayCounts);
		const totalCommits = Object.values(dayCounts).reduce((a, b) => a + b, 0);
		
		return { dayCounts, topDays, totalCommits };
	}, [commits]);

	const weekdayCommits = dayData ? [1, 2, 3, 4, 5].reduce((sum, day) => sum + dayData.dayCounts[day], 0) : 0;
	const weekendCommits = dayData ? dayData.dayCounts[0] + dayData.dayCounts[6] : 0;

	const maxCount = dayData ? Math.max(...Object.values(dayData.dayCounts)) : 0;
	const chartData = dayData 
		? Object.entries(dayData.dayCounts).map(([day, count]) => ({
			label: getDayName(Number.parseInt(day)),
			value: count,
			isPeak: count === maxCount
		}))
		: Array.from({ length: 7 }, (_, i) => ({
			label: getDayName(i),
			value: 0,
			isPeak: false
		}));

	return (
		<InsightSection
			title="7일의 패턴"
			subtitle="일주일 동안 어떤 리듬으로 작업하셨나요?"
			chart={<BarChart data={chartData} maxValue={maxCount} height={320} barHeight={280} />}
			topItems={dayData?.topDays.map(([day, count]) => ({
				label: `${getDayName(Number.parseInt(day))}요일`,
				value: `${count}개`,
				rank: 0
			})) || []}
			stats={[
				{ label: '평일 커밋', value: weekdayCommits || '-' },
				{ label: '주말 커밋', value: weekendCommits || '-' },
			]}
			isFetching={isFetching}
		/>
	);
}
