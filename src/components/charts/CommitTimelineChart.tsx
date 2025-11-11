import ChartCard from '@/components/ChartCard';
import { calculateCommitTimeline } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function CommitTimelineChart() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateCommitTimeline(commits) : undefined;

	return (
		<ChartCard
			ref={ref}
			title="월별 커밋 타임라인"
			description="올해 월별 커밋 활동 추세"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="month"
		/>
	);
}
