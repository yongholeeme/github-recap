import { useQuery } from "@tanstack/react-query";
import ChartCard from "../ChartCard";
import { getCommitsByDayOfWeek } from "../../lib/github";

export default function CommitsByDayChart() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-commits-by-day"],
		queryFn: () => getCommitsByDayOfWeek(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<ChartCard
			title="요일별 커밋 분포"
			description="일주일 동안 요일별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="day"
		/>
	);
}
