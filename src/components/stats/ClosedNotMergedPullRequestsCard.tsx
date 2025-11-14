
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getClosedNotMergedPullRequestsCount } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function ClosedNotMergedPullRequestsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.closedNotMerged(year),
		queryFn: () => getClosedNotMergedPullRequestsCount(year),
		
	});

	return (
		<StatCard
			title="닫힌 PR"
			description="머지되지 않음"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
