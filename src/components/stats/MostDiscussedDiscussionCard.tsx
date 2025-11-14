import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedDiscussion } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedDiscussionCard() {
	const { year } = useYear();
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.discussions.mostDiscussed(year),
		queryFn: () => getMostDiscussedDiscussion(year),
	});

	if (!data) {
		return (
			<DetailCard
				title="가장 치열했던 디스커션"
				value="-"
				subtitle="코멘트 수 기준"
				isLoading={isLoading}
			/>
		);
	}

	return (
		<DetailCard
			title="가장 치열했던 디스커션"
			value={`${data.comments}개`}
			subtitle={data.title}
			link={data.url}
			isLoading={isLoading}
		/>
	);
}
