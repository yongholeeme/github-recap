import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getTotalForksReceived } from "../../lib/github";

export default function TotalForksCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-total-forks"],
		queryFn: () => getTotalForksReceived(),
		staleTime: 1000 * 60 * 10,
	});

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
