import StatCard from '@/components/StatCard';
import { getIssuesCount } from '@/lib/github/issues';;
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedIssuesCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.issues.all(),
		queryFn: () => getIssuesCount(),
	});

	return (
		<StatCard
			ref={ref}
			title="생성한 이슈"
			description="작성한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
