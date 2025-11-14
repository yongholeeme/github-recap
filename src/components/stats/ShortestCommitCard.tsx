import StatCard from '@/components/StatCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';

function calculateShortestCommitMessageLength(commits: CommitData): number {
  if (commits.length === 0) {
    return 0;
  }

  let minLength = commits[0].message.length;
  for (const commit of commits) {
    if (commit.message.length < minLength) {
      minLength = commit.message.length;
    }
  }

  return minLength;
}


export default function ShortestCommitCard() {
	const { year } = useYear();
	const { data: commits, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateShortestCommitMessageLength(commits) : undefined;

	return (
		<StatCard
			title="가장 짧은 커밋"
			description="가장 짧은 커밋 메시지 길이"
			value={data}
			isFetching={isFetching}
			error={error}
		/>
	);
}
