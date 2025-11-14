import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';
import { useMostDiscussedDiscussion } from '@/lib/hooks/useMostDiscussedDiscussion';

export default function MostDiscussedDiscussionCard() {
	const { year } = useYear();
	const { data, isFetching } = useMostDiscussedDiscussion(year);

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
