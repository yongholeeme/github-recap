
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getIssueCommentsCount } from '@/lib/github';
import { queryKeys } from '@/lib/queryKeys';

export default function IssueCommentsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.issues.comments(),
		queryFn: () => getIssueCommentsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
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
