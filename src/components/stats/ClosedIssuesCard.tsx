import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getClosedIssuesCount } from "../../lib/github";

export default function ClosedIssuesCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-closed-issues"],
		queryFn: () => getClosedIssuesCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="닫은 이슈"
			description="해결한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
