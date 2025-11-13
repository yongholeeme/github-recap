
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getIssueCommentsCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';

export default function IssueCommentsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.issues.comments(),
		queryFn: () => getIssueCommentsCount(),
		
	});

	return (
		<StatCard
			title="이슈 댓글"
			description="이슈 토론 참여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
