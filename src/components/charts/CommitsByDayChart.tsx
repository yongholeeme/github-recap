import ChartCard from '@/components/ChartCard';
import { calculateCommitsByDayOfWeek } from '@/lib/github';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function CommitsByDayChart() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateCommitsByDayOfWeek(commits) : undefined;

	return (
		<ChartCard
			title="요일별 커밋 분포"
			description="일주일 동안 요일별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="day"
		/>
	);
}
