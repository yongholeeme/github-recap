import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getPullRequestReviewsCount } from "../../lib/github";

export default function PullRequestReviewsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-pr-reviews"],
		queryFn: () => getPullRequestReviewsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="PR 리뷰"
			description="리뷰한 PR"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
