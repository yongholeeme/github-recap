import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getPullRequestReviewCommentsCount } from "../../lib/github";

export default function PullRequestReviewCommentsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-pr-review-comments"],
		queryFn: () => getPullRequestReviewCommentsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="리뷰 댓글"
			description="코드 리뷰 댓글"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
