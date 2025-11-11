import { useQuery } from "@tanstack/react-query";
import ChartCard from "../ChartCard";
import { getCommitsByHour } from "../../lib/github";

export default function CommitsByHourChart() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-commits-by-hour"],
		queryFn: () => getCommitsByHour(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<ChartCard
			title="시간대별 커밋 분포"
			description="24시간 동안 시간대별 커밋 활동"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="hour"
		/>
	);
}
