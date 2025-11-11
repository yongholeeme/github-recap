import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getTotalStarsReceived } from "../../lib/github";

export default function TotalStarsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-total-stars"],
		queryFn: () => getTotalStarsReceived(),
		staleTime: 1000 * 60 * 10,
	});

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
