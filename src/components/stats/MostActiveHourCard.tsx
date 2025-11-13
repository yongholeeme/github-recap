import StatCard from '@/components/StatCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

function calculateMostActiveHour(commits: CommitData): number {
  const hourCounts: Record<number, number> = {};
  for (const item of commits) {
    if (!item.committedDate) continue;
    const date = new Date(item.committedDate);
    const hour = date.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }

  let mostActiveHour = 0;
  let maxCount = 0;
  for (const [hour, count] of Object.entries(hourCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostActiveHour = Number(hour);
    }
  }

  return mostActiveHour;
}


export default function MostActiveHourCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateMostActiveHour(commits) : undefined;

	return (
		<StatCard
			ref={ref}
			title="가장 활발한 시간"
			description="커밋이 가장 많은 시간대"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
