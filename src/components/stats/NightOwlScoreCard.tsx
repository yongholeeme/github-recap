import StatCard from '@/components/StatCard';
import { calculateNightOwlScore } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function NightOwlScoreCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateNightOwlScore(commits) : undefined;

	return (
		<StatCard
			title="야행성 지수 🦉"
			description="자정~오전 6시 커밋 비율"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			suffix="%"
		/>
	);
}
