import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getMergedPullRequestsCount } from "../../lib/github";

export default function MergedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-merged-prs"],
		queryFn: () => getMergedPullRequestsCount(),
		
	});

	return (
		<StatCard
			title="머지된 PR"
			description="병합 완료"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
