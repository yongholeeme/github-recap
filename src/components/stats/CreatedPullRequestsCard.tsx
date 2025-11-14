import StatCard from '@/components/StatCard';
import { getPullRequestsCount } from '@/lib/github/pullRequests';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedPullRequestsCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.pullRequests.all(),
		queryFn: () => getPullRequestsCount(),
	});

	return (
		<StatCard
			title="생성한 PR"
			description="작성한 풀 리퀘스트"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
