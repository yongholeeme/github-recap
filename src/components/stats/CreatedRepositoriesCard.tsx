
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getCreatedReposCount } from '@/lib/github/repositories';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function CreatedRepositoriesCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.repositories.created(year),
		queryFn: () => getCreatedReposCount(year),
		
	});

	return (
		<StatCard
			title="생성한 저장소"
			description="올해 생성한 저장소"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
