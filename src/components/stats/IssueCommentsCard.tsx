
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getIssueCommentsCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function IssueCommentsCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.comments(year),
		queryFn: () => getIssueCommentsCount(year),
		
	});

	return (
		<StatCard
			title="이슈 댓글"
			description="이슈 토론 참여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
