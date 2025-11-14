import StatCard from '@/components/StatCard';
import { type CommitData } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';

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
	const { year } = useYear();
	const { data: commits, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateAverageCommitMessageLength(commits) : undefined;

	return (
		<StatCard
			title="평균 커밋 메시지 길이"
			description="커밋 메시지 평균 글자 수"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
