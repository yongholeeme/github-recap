
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getContributedReposCount } from '@/lib/github/repositories';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function ContributedRepositoriesCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.repositories.contributed(year),
		queryFn: () => getContributedReposCount(year),
		
	});

	return (
		<StatCard
			title="기여한 외부 저장소"
			description="다른 저장소 기여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
