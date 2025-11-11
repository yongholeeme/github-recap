import { useMemo } from "react";
import StatCard from "../StatCard";
import { calculateTotalStarsReceived } from "../../lib/github";
import { useRepositoriesData } from "../../lib/hooks";

export default function TotalStarsCard() {
	const { data: repos, isLoading, isFetching, error, refetch } = useRepositoriesData();
	
	const data = useMemo(() => {
		if (!repos) return undefined;
		return calculateTotalStarsReceived(repos);
	}, [repos]);

	return (
		<StatCard
			title="받은 스타"
			description="모든 저장소의 스타"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
