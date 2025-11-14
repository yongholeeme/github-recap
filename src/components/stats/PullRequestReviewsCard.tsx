import StatCard from '@/components/StatCard';
import { getPullRequestReviewsCount } from '@/lib/github/pullRequests';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function PullRequestReviewsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.reviews(year),
		queryFn: () => getPullRequestReviewsCount(year),
	});

	return (
		<StatCard
			title="PR 리뷰"
			description="리뷰한 PR"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
