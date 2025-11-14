import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedPR } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedPRCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.pullRequests.mostDiscussed(year),
		queryFn: () => getMostDiscussedPR(year),
	});

	if (!data) {
		return (
			<DetailCard
				title="가장 치열했던 PR"
				value="-"
				subtitle="코멘트 수 기준"
				isFetching={isFetching}
			/>
		);
	}

	return (
		<DetailCard
			title="가장 치열했던 PR"
			value={`${data.comments}개`}
			subtitle={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
