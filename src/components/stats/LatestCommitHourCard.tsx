import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getLatestCommitHour } from "../../lib/github";

export default function LatestCommitHourCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-latest-commit-hour"],
		queryFn: () => getLatestCommitHour(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
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
