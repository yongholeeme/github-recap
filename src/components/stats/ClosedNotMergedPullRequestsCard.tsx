
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getClosedNotMergedPullRequestsCount } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';

export default function ClosedNotMergedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.closedNotMerged(),
		queryFn: () => getClosedNotMergedPullRequestsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
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
