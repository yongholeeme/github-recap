import { useMemo } from "react";
import ChartCard from "../ChartCard";
import { calculateCommitTimeline } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function CommitTimelineChart() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateCommitTimeline(commits);
	}, [commits]);

	return (
		<ChartCard
			title="월별 커밋 타임라인"
			description="올해 월별 커밋 활동 추세"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="month"
		/>
	);
}
