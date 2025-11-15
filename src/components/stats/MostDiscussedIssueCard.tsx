import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';
import { useMostDiscussedIssue } from '@/lib/hooks/useMostDiscussedIssue';

export default function MostDiscussedIssueCard() {
	const { year } = useYear();
	const { data, isFetching } = useMostDiscussedIssue(year);

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
			value={`${data.comments}개의 댓글`}
			description={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
