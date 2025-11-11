import { useQuery } from "@tanstack/react-query";
import CommitMessageCard from "../CommitMessageCard";
import { getShortestCommitMessage } from "../../lib/github";

export default function ShortestCommitCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-shortest-commit-message"],
		queryFn: () => getShortestCommitMessage(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<CommitMessageCard
			title="가장 짧은 커밋"
			description="가장 짧은 커밋 메시지 길이"
			value={data?.length}
			commitMessage={data?.message}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			onShowMessage={() => {
				if (data?.url) {
					window.open(data.url, "_blank");
				}
			}}
		/>
	);
}
