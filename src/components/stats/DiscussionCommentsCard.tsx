import StatCard from '@/components/StatCard';
import { getDiscussionCommentsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function DiscussionCommentsCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.comments(),
		queryFn: () => getDiscussionCommentsCount(),
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
