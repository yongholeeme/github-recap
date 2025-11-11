import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getPullRequestsCount } from "../../lib/github";

export default function CreatedPullRequestsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-pull-requests"],
		queryFn: () => getPullRequestsCount(),
		
	});

	return (
		<StatCard
			title="생성한 PR"
			description="작성한 풀 리퀘스트"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
