import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getMostActiveHour } from "../../lib/github";

export default function MostActiveHourCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-most-active-hour"],
		queryFn: () => getMostActiveHour(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="가장 활발한 시간"
			description="커밋이 가장 많은 시간대"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
