import StatCard from '@/components/StatCard';
import { type CommitData } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';

 function calculateAverageCommitMessageLength(
  commits: CommitData
): number {
  if (commits.length === 0) return 0;

  let totalLength = 0;
  for (const commit of commits) {
    totalLength += commit.message.length;
  }

  return Math.round(totalLength / commits.length);
}

export default function AverageCommitMessageLengthCard() {
	const { data: commits, isLoading, isFetching, error } = useCommitsData();
	
	const data = commits ? calculateAverageCommitMessageLength(commits) : undefined;

	return (
		<StatCard
			title="평균 커밋 메시지 길이"
			description="커밋 메시지 평균 글자 수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
