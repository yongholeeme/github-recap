
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getRequestedChangesPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';

export default function RequestedChangesPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.pullRequests.requestedChanges(),
		queryFn: () => getRequestedChangesPullRequestsCount(),
		
	});

	return (
		<StatCard
			title="변경 요청"
			description="Request Changes"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
