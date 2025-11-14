import StatCard from '@/components/StatCard';
import { getParticipatedDiscussionsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function ParticipatedDiscussionsCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.participated(),
		queryFn: () => getParticipatedDiscussionsCount(),
	});

	return (
		<StatCard
			title="참여한 토론"
			description="작성 + 댓글"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
