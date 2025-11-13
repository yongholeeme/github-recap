
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getContributedReposCount } from '@/lib/github/repositories';;
import { queryKeys } from '@/lib/queryKeys';

export default function ContributedRepositoriesCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.repositories.contributed(),
		queryFn: () => getContributedReposCount(),
		
	});

	return (
		<StatCard
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
