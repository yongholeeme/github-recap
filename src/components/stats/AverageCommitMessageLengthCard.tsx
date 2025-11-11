import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { getAverageCommitMessageLength } from "../../lib/github";

export default function AverageCommitMessageLengthCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: ["github-average-commit-message"],
		queryFn: () => getAverageCommitMessageLength(),
		staleTime: 1000 * 60 * 10,
	});

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
