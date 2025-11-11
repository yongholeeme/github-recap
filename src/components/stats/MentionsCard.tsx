import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getMentionsCount } from "../../lib/github";

export default function MentionsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-mentions"],
		queryFn: () => getMentionsCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="멘션"
			description="멘션된 횟수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
