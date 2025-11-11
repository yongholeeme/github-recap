import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getApprovedPullRequestsCount } from "../../lib/github";

export default function ApprovedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-approved-prs"],
		queryFn: () => getApprovedPullRequestsCount(),
		
	});

	return (
		<StatCard
			title="승인한 PR"
			description="Approve"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
