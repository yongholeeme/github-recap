
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getRequestedChangesPullRequestsCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function RequestedChangesPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.requestedChanges(),
		queryFn: () => getRequestedChangesPullRequestsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
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
