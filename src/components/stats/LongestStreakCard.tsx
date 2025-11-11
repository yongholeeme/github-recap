import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getLongestStreak } from "../../lib/github";

export default function LongestStreakCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-longest-streak"],
		queryFn: () => getLongestStreak(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="최장 연속 기여"
			description="연속으로 기여한 최대 일수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
