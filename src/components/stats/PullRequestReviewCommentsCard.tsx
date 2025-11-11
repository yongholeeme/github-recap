
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getPullRequestReviewCommentsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';

export default function PullRequestReviewCommentsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.pullRequests.reviewComments(),
		queryFn: () => getPullRequestReviewCommentsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="리뷰 댓글"
			description="코드 리뷰 댓글"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
