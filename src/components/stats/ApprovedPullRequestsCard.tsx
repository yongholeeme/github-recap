
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getApprovedPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';

export default function ApprovedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.pullRequests.approved(),
		queryFn: () => getApprovedPullRequestsCount(),
		
	});

	return (
		<StatCard
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
