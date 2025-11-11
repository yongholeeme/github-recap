import { useMemo } from "react";
import ChartCard from "../ChartCard";
import { calculateCommitsByHour } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function CommitsByHourChart() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateCommitsByHour(commits);
	}, [commits]);

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
