import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getIssuesCount } from "../../lib/github";

export default function CreatedIssuesCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-issues"],
		queryFn: () => getIssuesCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="생성한 이슈"
			description="작성한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
