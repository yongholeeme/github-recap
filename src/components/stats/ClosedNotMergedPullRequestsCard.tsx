
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getClosedNotMergedPullRequestsCount } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';

export default function ClosedNotMergedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.pullRequests.closedNotMerged(),
		queryFn: () => getClosedNotMergedPullRequestsCount(),
		
	});

	return (
		<StatCard
			title="닫힌 PR"
			description="머지되지 않음"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
