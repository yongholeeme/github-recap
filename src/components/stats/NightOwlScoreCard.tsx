import { useMemo } from "react";
import StatCard from "../StatCard";
import { calculateNightOwlScore } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function NightOwlScoreCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateNightOwlScore(commits);
	}, [commits]);

	return (
		<StatCard
			title="야행성 지수 🦉"
			description="자정~오전 6시 커밋 비율"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			suffix="%"
		/>
	);
}
