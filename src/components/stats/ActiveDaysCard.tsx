import { useMemo } from "react";
import StatCard from "../StatCard";
import { calculateActiveDaysCount } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function ActiveDaysCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateActiveDaysCount(commits);
	}, [commits]);

	return (
		<StatCard
			title="활동한 날"
			description="기여한 날짜 수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
