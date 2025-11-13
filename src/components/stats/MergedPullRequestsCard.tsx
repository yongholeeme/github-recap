
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMergedPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';

export default function MergedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.pullRequests.merged(),
		queryFn: () => getMergedPullRequestsCount(),
		
	});

	return (
		<StatCard
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
