
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getRequestedChangesPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function RequestedChangesPullRequestsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.requestedChanges(year),
		queryFn: () => getRequestedChangesPullRequestsCount(year),
		
	});

	return (
		<StatCard
			title="변경 요청"
			description="Request Changes"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
