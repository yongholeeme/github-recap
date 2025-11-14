import StatCard from '@/components/StatCard';
import { getCreatedDiscussionsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedDiscussionsCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.created(),
		queryFn: () => getCreatedDiscussionsCount(),
	});

	return (
		<StatCard
			title="생성한 토론"
			description="작성한 Discussion"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
