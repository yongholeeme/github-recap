import ChartCard from '@/components/ChartCard';
import { calculateCommitsByHour } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function CommitsByHourChart() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateCommitsByHour(commits) : undefined;

	return (
		<ChartCard
			title="시간대별 커밋 분포"
			description="24시간 동안 시간대별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="hour"
		/>
	);
}
