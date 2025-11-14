import StatCard from '@/components/StatCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';

function calculateLongestCommitMessageLength(commits: CommitData): number {
  if (commits.length === 0) {
    return 0;
  }

  let maxLength = 0;
  for (const commit of commits) {
    if (commit.message.length > maxLength) {
      maxLength = commit.message.length;
    }
  }

  return maxLength;
}


export default function LongestCommitCard() {
	const { year } = useYear();
	const { data: commits, isLoading, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateLongestCommitMessageLength(commits) : undefined;

	return (
		<StatCard
			title="가장 긴 커밋"
			description="가장 긴 커밋 메시지 길이"
			value={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
