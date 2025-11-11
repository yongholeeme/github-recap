import StatCard from '@/components/StatCard';
import { calculateLongestStreak } from '@/lib/github';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function LongestStreakCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
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
