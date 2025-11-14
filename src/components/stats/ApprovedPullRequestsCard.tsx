
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getApprovedPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function ApprovedPullRequestsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.approved(year),
		queryFn: () => getApprovedPullRequestsCount(year),
		
	});

	return (
		<StatCard
			title="승인한 PR"
			description="Approve"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
