import StatCard from '@/components/StatCard';
import { getPullRequestReviewsCount } from '@/lib/github/pullRequests';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function PullRequestReviewsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.pullRequests.reviews(),
		queryFn: () => getPullRequestReviewsCount(),
	});

	return (
		<StatCard
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
