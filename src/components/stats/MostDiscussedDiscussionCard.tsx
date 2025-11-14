import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedDiscussion } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';
import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedDiscussionCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.discussions.mostDiscussed(year),
		queryFn: () => getMostDiscussedDiscussion(year),
	});

	if (!data) {
		return (
			<StatCard
				title="가장 치열했던 디스커션"
				value="-"
				description="코멘트 수 기준"
				isFetching={isFetching}
			/>
		);
	}

	return (
		<StatCard
			title="가장 치열했던 디스커션"
			value={`${data.comments}개`}
			description={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
