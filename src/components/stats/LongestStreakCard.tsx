import StatCard from '@/components/StatCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

 function calculateLongestStreak(commits: CommitData): number {
  const dates = new Set<string>();
  for (const item of commits) {
    if (!item.committedDate) continue;
    const date = new Date(item.committedDate);
    const dateStr = date.toISOString().split("T")[0];
    dates.add(dateStr);
  }

  const sortedDates = Array.from(dates).sort();
  let currentStreak = 1;
  let longestStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

export default function LongestStreakCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = commits ? calculateLongestStreak(commits) : undefined;

	return (
		<StatCard
			title="최장 연속 기여"
			description="연속으로 기여한 최대 일수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			suffix="일"
		/>
	);
}
