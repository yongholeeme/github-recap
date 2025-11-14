import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedIssue } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedIssueCard() {
	const { year } = useYear();
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.issues.mostDiscussed(year),
		queryFn: () => getMostDiscussedIssue(year),
	});

	if (!data) {
		return (
			<DetailCard
				title="가장 치열했던 이슈"
				value="-"
				subtitle="코멘트 수 기준"
				isLoading={isLoading}
			/>
		);
	}

	return (
		<DetailCard
			title="가장 치열했던 이슈"
			value={`${data.comments}개`}
			subtitle={data.title}
			link={data.url}
			isLoading={isLoading}
		/>
	);
}
