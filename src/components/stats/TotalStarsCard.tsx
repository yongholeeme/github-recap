import StatCard from '@/components/StatCard';
import { useRepositoriesData } from '@/lib/hooks/useRepositoriesData';

export default function TotalStarsCard() {
	const { data: repos, isLoading, isFetching, error, refetch } = useRepositoriesData();
	
	const data = repos
		? repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0)
		: undefined;

	return (
		<StatCard
			title="받은 스타"
			description="모든 저장소의 스타"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
