
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getPullRequestDiscussionsCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function PullRequestDiscussionsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.discussions(),
		queryFn: () => getPullRequestDiscussionsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="PR 토론"
			description="토론 참여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
