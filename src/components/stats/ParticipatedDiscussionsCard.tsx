import StatCard from '@/components/StatCard';
import { getParticipatedDiscussionsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function ParticipatedDiscussionsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.participated(year),
		queryFn: () => getParticipatedDiscussionsCount(year),
	});

	return (
		<StatCard
			title="참여한 디스커션"
			description="작성 + 코멘트"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
