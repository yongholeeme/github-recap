import { useMemo } from "react";
import ChartCard from "../ChartCard";
import { calculateCommitsByDayOfWeek } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function CommitsByDayChart() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateCommitsByDayOfWeek(commits);
	}, [commits]);

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
