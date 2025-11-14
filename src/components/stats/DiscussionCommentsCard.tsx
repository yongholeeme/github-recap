import StatCard from '@/components/StatCard';
import { getDiscussionCommentsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function DiscussionCommentsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.comments(year),
		queryFn: () => getDiscussionCommentsCount(year),
	});

	return (
		<StatCard
			title="토론 댓글"
			description="Discussion 댓글"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
