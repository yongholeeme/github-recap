import StatCard from '@/components/StatCard';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function LatestCommitHourCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();

	let latestHour = 0;
	if (commits) {
		for (const item of commits) {
			const date = new Date(item.commit.author?.date || "");
			const hour = date.getHours();
			if (hour > latestHour) {
				latestHour = hour;
			}
		}
	}

	const data = commits ? latestHour : undefined;

	return (
		<StatCard
			ref={ref}
			title="최근 커밋 시간"
			description="가장 최근 커밋한 시간 (24시간 기준)"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
