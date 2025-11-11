import StatCard from '@/components/StatCard';
import { calculateActiveDaysCount } from '@/lib/github';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function ActiveDaysCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateActiveDaysCount(commits) : undefined;

	return (
		<StatCard
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
