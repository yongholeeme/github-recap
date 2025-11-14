import StatCard from '@/components/StatCard';
import { getParticipatedIssuesCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function ParticipatedIssuesCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.participated(),
		queryFn: () => getParticipatedIssuesCount(),
	});

	return (
		<StatCard
			title="참여한 이슈"
			description="작성 + 댓글"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
