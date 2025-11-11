import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getCreatedReposCount } from "../../lib/github";

export default function CreatedRepositoriesCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-created-repos"],
		queryFn: () => getCreatedReposCount(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<StatCard
			title="생성한 저장소"
			description="올해 생성한 저장소"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
