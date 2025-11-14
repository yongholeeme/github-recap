import ChartCard from '@/components/ChartCard';
import { type CommitData } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';


 function calculateCommitsByDayOfWeek(
  commits: CommitData
): Array<{ day: string; count: number }> {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayCounts: Record<number, number> = {};

  // Initialize all days with 0
  for (let i = 0; i < 7; i++) {
    dayCounts[i] = 0;
  }

  for (const commit of commits) {
    const date = new Date(commit.committedDate);
    const dayOfWeek = date.getDay();
    dayCounts[dayOfWeek] = (dayCounts[dayOfWeek] || 0) + 1;
  }

  return Object.entries(dayCounts).map(([day, count]) => ({
    day: dayNames[Number(day)],
    count,
  }));
}


export default function CommitsByDayChart() {
	const { year } = useYear();
	const { data: commits, isLoading, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateCommitsByDayOfWeek(commits) : undefined;

	return (
		<ChartCard
			title="요일별 커밋 분포"
			description="일주일 동안 요일별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			dataKey="day"
		/>
	);
}
