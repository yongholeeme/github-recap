import { useQuery } from "@tanstack/react-query";
import CommitMessageCard from "../CommitMessageCard";
import { getLongestCommitMessage } from "../../lib/github";

export default function LongestCommitCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-longest-commit-message"],
		queryFn: () => getLongestCommitMessage(),
		staleTime: 1000 * 60 * 10,
	});

	return (
		<CommitMessageCard
			title="가장 긴 커밋"
			description="가장 긴 커밋 메시지 길이"
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
