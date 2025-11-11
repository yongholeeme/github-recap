import { useMemo } from "react";
import StatCard from "../StatCard";
import { calculateTotalForksReceived } from "../../lib/github";
import { useRepositoriesData } from "../../lib/hooks";

export default function TotalForksCard() {
	const { data: repos, isLoading, isFetching, error, refetch } = useRepositoriesData();
	
	const data = useMemo(() => {
		if (!repos) return undefined;
		return calculateTotalForksReceived(repos);
	}, [repos]);

	return (
		<StatCard
			title="받은 포크"
			description="모든 저장소의 포크"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
