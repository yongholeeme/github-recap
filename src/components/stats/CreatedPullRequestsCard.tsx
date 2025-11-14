import StatCard from '@/components/StatCard';
import { getPullRequestsCount } from '@/lib/github/pullRequests';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function CreatedPullRequestsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.all(year),
		queryFn: () => getPullRequestsCount(year),
	});

	return (
		<StatCard
			title="생성한 PR"
			description="작성한 풀 리퀘스트"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
