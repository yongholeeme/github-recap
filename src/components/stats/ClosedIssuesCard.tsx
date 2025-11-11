
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getClosedIssuesCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function ClosedIssuesCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.issues.closed(),
		queryFn: () => getClosedIssuesCount(),
		
	});

	return (
		<StatCard
			ref={ref}
			title="닫은 이슈"
			description="해결한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
