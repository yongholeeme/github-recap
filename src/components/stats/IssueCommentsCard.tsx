
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getIssueCommentsCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function IssueCommentsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.comments(year),
		queryFn: () => getIssueCommentsCount(year),
		
	});

	return (
		<StatCard
			title="이슈 코멘트"
			description="코멘트"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
