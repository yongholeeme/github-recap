import StatCard from '@/components/StatCard';
import { useRepositoriesData } from '@/lib/hooks/useRepositoriesData';

export default function TotalForksCard() {
	const { data: repos, isLoading, isFetching, error } = useRepositoriesData();
	
	const data = repos
		? repos.reduce((total, repo) => total + (repo.forks_count || 0), 0)
		: undefined;

	return (
		<StatCard
			title="받은 포크"
			description="모든 저장소의 포크"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
