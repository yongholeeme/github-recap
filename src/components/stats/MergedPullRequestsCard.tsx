
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMergedPullRequestsCount } from '@/lib/github/pullRequests';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function MergedPullRequestsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.merged(year),
		queryFn: () => getMergedPullRequestsCount(year),
		
	});

	return (
		<StatCard
			title="머지된 PR"
			description="병합 완료"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
