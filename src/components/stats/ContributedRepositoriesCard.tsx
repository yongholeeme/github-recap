
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getContributedReposCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function ContributedRepositoriesCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.repositories.contributed(),
		queryFn: () => getContributedReposCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="기여한 외부 저장소"
			description="다른 저장소 기여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
