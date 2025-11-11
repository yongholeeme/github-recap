import StatCard from '@/components/StatCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

function calculateActiveDaysCount(commits: CommitData): number {
  const uniqueDates = new Set<string>();
  for (const item of commits) {
    const date = new Date(item.commit.author?.date || "");
    const dateStr = date.toISOString().split("T")[0];
    uniqueDates.add(dateStr);
  }

  return uniqueDates.size;
}


export default function ActiveDaysCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateActiveDaysCount(commits) : undefined;

	return (
		<StatCard
			ref={ref}
			title="활동한 날"
			description="기여한 날짜 수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
