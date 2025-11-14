import ChartCard from '@/components/ChartCard';
import { type CommitData } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';

function calculateCommitsByHour(
  commits: CommitData
): Array<{ hour: number; count: number }> {
  const hourCounts: Record<number, number> = {};
  // Initialize all hours with 0
  for (let i = 0; i < 24; i++) {
    hourCounts[i] = 0;
  }

  for (const commit of commits) {
    const date = new Date(commit.committedDate);
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  return Object.entries(hourCounts).map(([hour, count]) => ({
    hour: Number(hour),
    count,
  }));
}


export default function CommitsByHourChart() {
	const { year } = useYear();
	const { data: commits, isLoading, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateCommitsByHour(commits) : undefined;

	return (
		<ChartCard
			title="시간대별 커밋 분포"
			description="24시간 동안 시간대별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			dataKey="hour"
		/>
	);
}
