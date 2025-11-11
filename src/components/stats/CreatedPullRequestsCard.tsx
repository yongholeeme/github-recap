import StatCard from '@/components/StatCard';
import { getPullRequestsCount } from '@/lib/github';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.all(),
		queryFn: () => getPullRequestsCount(),
	});

	return (
		<StatCard
			ref={ref}
			title="생성한 PR"
			description="작성한 풀 리퀘스트"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
