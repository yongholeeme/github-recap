import StatCard from '@/components/StatCard';
import { getCommitsCount } from '@/lib/github';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { queryKeys } from '@/lib/queryKeys';

export default function TotalCommitsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.commits.all(),
		queryFn: () => getCommitsCount(),
	});

	return (
		<StatCard
			ref={ref}
			title="총 커밋"
			description="올해 작성한 커밋"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
