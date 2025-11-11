import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getIssueCommentsCount } from "../../lib/github";

export default function IssueCommentsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-issue-comments"],
		queryFn: () => getIssueCommentsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="이슈 댓글"
			description="이슈 토론 참여"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
