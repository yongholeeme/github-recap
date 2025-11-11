import { useMemo } from "react";
import CommitMessageCard from "../CommitMessageCard";
import { calculateShortestCommitMessage } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function ShortestCommitCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateShortestCommitMessage(commits);
	}, [commits]);

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
