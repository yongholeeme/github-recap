import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getPullRequestDiscussionsCount } from "../../lib/github";

export default function PullRequestDiscussionsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-pr-discussions"],
		queryFn: () => getPullRequestDiscussionsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="PR 토론"
			description="토론 참여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
