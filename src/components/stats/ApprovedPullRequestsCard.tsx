
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getApprovedPullRequestsCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function ApprovedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.approved(),
		queryFn: () => getApprovedPullRequestsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="승인한 PR"
			description="Approve"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
