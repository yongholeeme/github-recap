import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedIssue } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';
import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedIssueCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.issues.mostDiscussed(year),
		queryFn: () => getMostDiscussedIssue(year),
	});

	if (!data) {
		return (
			<StatCard
				title="가장 치열했던 이슈"
				value="-"
				description="코멘트 수 기준"
				isFetching={isFetching}
			/>
		);
	}

	return (
		<StatCard
			title="가장 치열했던 이슈"
			value={`${data.comments}개`}
			description={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
