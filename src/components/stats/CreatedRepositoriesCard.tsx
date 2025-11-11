
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getCreatedReposCount } from '@/lib/github/repositories';;
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedRepositoriesCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.repositories.created(),
		queryFn: () => getCreatedReposCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="생성한 저장소"
			description="올해 생성한 저장소"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
