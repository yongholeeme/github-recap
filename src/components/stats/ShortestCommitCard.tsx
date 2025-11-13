import CommitMessageCard from '@/components/CommitMessageCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

function calculateShortestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
} {
  if (commits.length === 0) {
    return { message: "", length: 0 };
  }

  let shortestCommit = commits[0];
  for (const commit of commits) {
    if (commit.message.length < shortestCommit.message.length) {
      shortestCommit = commit;
    }
  }

  return {
    message: shortestCommit.message,
    length: shortestCommit.message.length,
  };
}


export default function ShortestCommitCard() {
	const { data: commits, isLoading, isFetching, error, refetch } = useCommitsData();
	
	const data = commits ? calculateShortestCommitMessage(commits) : undefined;

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
		/>
	);
}
