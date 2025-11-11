import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getRequestedChangesPullRequestsCount } from "../../lib/github";

export default function RequestedChangesPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-requested-changes"],
		queryFn: () => getRequestedChangesPullRequestsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="변경 요청"
			description="Request Changes"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
