import StatCard from '@/components/StatCard';
import { getPullRequestReviewsCount } from '@/lib/github';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { queryKeys } from '@/lib/queryKeys';

export default function PullRequestReviewsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.reviews(),
		queryFn: () => getPullRequestReviewsCount(),
	});

	return (
		<StatCard
			ref={ref}
			title="PR 리뷰"
			description="리뷰한 PR"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
