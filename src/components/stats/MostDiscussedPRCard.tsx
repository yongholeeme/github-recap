import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedPR } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedPRCard() {
	const { year } = useYear();
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.pullRequests.mostDiscussed(year),
		queryFn: () => getMostDiscussedPR(year),
	});

    console.log({data})
	if (!data) {
		return (
			<DetailCard
				title="가장 치열했던 PR"
				value="-"
				subtitle="코멘트 수 기준"
				isLoading={isLoading}
			/>
		);
	}


	return (
		<DetailCard
			title="가장 치열했던 PR"
			value={`${data.comments}개`}
			subtitle={data.title}
			link={data.url}
			isLoading={isLoading}
		/>
	);
}
