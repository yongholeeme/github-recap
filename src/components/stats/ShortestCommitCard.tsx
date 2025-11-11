import CommitMessageCard from '@/components/CommitMessageCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

function calculateShortestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
  repository: string;
  url: string;
} {
  if (commits.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let shortestCommit = commits[0];
  for (const item of commits) {
    if (item.commit.message.length < shortestCommit.commit.message.length) {
      shortestCommit = item;
    }
  }

  return {
    message: shortestCommit.commit.message,
    length: shortestCommit.commit.message.length,
    repository: shortestCommit.repository.full_name,
    url: shortestCommit.html_url,
  };
}


export default function ShortestCommitCard() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateShortestCommitMessage(commits) : undefined;

	return (
		<CommitMessageCard
			ref={ref}
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
