
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getClosedIssuesCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function ClosedIssuesCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.closed(year),
		queryFn: () => getClosedIssuesCount(year),
		
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
