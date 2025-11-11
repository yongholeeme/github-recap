
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getMergedPullRequestsCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function MergedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.merged(),
		queryFn: () => getMergedPullRequestsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="머지된 PR"
			description="병합 완료"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
