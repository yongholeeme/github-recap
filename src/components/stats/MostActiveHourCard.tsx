import StatCard from '@/components/StatCard';
import { calculateMostActiveHour } from '@/lib/github';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function MostActiveHourCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateMostActiveHour(commits) : undefined;

	return (
		<StatCard
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
