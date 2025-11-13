import CommitMessageCard from '@/components/CommitMessageCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

 function calculateLongestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
} {
  if (commits.length === 0) {
    return { message: "", length: 0 };
  }

  let longestCommit = commits[0];
  for (const commit of commits) {
    if (commit.message.length > longestCommit.message.length) {
      longestCommit = commit;
    }
  }

  return {
    message: longestCommit.message,
    length: longestCommit.message.length,
  };
}


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
		/>
	);
}
