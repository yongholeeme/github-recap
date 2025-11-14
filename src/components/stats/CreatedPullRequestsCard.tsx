import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';
import { useCountOfMyCreatedPrs } from '@/lib/hooks/useCountOfMyCreatedPrs';

export default function CreatedPullRequestsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useCountOfMyCreatedPrs(year);

	return (
		<StatCard
			title="생성한 PR"
			description="작성한 풀 리퀘스트"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
