import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getActiveDaysCount } from "../../lib/github";

export default function ActiveDaysCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-active-days"],
		queryFn: () => getActiveDaysCount(),
		staleTime: 1000 * 60 * 10,
	});

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
