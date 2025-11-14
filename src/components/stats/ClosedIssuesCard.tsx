
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getClosedIssuesCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';

export default function ClosedIssuesCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.closed(),
		queryFn: () => getClosedIssuesCount(),
		
	});

	return (
		<StatCard
			title="닫은 이슈"
			description="해결한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
