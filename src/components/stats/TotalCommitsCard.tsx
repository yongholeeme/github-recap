import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getCommitsCount } from "../../lib/github";

export default function TotalCommitsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-commits"],
		queryFn: () => getCommitsCount(),
		
	});

	return (
		<StatCard
			title="총 커밋"
			description="올해 작성한 커밋"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
