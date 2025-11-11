import { useMemo } from "react";
import StatCard from "../StatCard";
import { calculateAverageCommitMessageLength } from "../../lib/github";
import { useCommitsData } from "../../lib/hooks";

export default function AverageCommitMessageLengthCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = useMemo(() => {
		if (!commits) return undefined;
		return calculateAverageCommitMessageLength(commits);
	}, [commits]);

	return (
		<StatCard
			title="평균 커밋 메시지 길이"
			description="커밋 메시지 평균 글자 수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
