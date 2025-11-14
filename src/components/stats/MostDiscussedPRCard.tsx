import { useQuery } from '@tanstack/react-query';
import { getMostDiscussedPR } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';

export default function MostDiscussedPRCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.pullRequests.mostDiscussed(year),
		queryFn: () => getMostDiscussedPR(year),
	});

	if (!data) {
		return (
			<StatCard
				title="가장 치열했던 PR"
				value="-"
				description="코멘트 수 기준"
				isFetching={isFetching}
			/>
		);
	}

	return (
		<StatCard
			title="가장 치열했던 PR"
			value={`${data.comments}개`}
			description={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
