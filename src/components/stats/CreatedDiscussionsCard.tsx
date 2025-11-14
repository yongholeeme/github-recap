import StatCard from '@/components/StatCard';
import { getCreatedDiscussionsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function CreatedDiscussionsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.created(year),
		queryFn: () => getCreatedDiscussionsCount(year),
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
