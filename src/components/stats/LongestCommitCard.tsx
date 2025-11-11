import { useMemo } from "react";
import CommitMessageCard from "../CommitMessageCard";
import { calculateLongestCommitMessage } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function LongestCommitCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateLongestCommitMessage(commits);
	}, [commits]);

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
