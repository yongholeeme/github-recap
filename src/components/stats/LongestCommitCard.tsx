import CommitMessageCard from '@/components/CommitMessageCard';
import { calculateLongestCommitMessage } from '@/lib/github';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

export default function LongestCommitCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateLongestCommitMessage(commits) : undefined;

	return (
		<CommitMessageCard
			ref={ref}
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
