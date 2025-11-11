import CommitMessageCard from '@/components/CommitMessageCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

 function calculateLongestCommitMessage(commits: CommitData): {
  message: string;
  length: number;
  repository: string;
  url: string;
} {
  if (commits.length === 0) {
    return { message: "", length: 0, repository: "", url: "" };
  }

  let longestCommit = commits[0];
  for (const item of commits) {
    if (item.commit.message.length > longestCommit.commit.message.length) {
      longestCommit = item;
    }
  }

  return {
    message: longestCommit.commit.message,
    length: longestCommit.commit.message.length,
    repository: longestCommit.repository.full_name,
    url: longestCommit.html_url,
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
			onShowMessage={() => {
				if (data?.url) {
					window.open(data.url, "_blank");
				}
			}}
		/>
	);
}
