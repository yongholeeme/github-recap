import StatCard from '@/components/StatCard';
import { type CommitData } from '@/lib/github/commits';;
import { useCommitsData } from '@/lib/hooks/useCommitsData';
import { useYear } from '@/contexts/YearContext';

function calculateNightOwlScore(commits: CommitData): number {
  if (commits.length === 0) return 0;

  let nightCommits = 0;
  for (const item of commits) {
    if (!item.committedDate) continue;
    const date = new Date(item.committedDate);
	const hour = date.getHours();
	// 자정(0시)부터 오전 6시까지
	if (hour >= 0 && hour < 6) {
	  nightCommits++;
	}
  }

  return Math.round((nightCommits / commits.length) * 100);
}


export default function NightOwlScoreCard() {
	const { year } = useYear();
	const { data: commits, isLoading, isFetching, error } = useCommitsData(year);
	
	const data = commits ? calculateNightOwlScore(commits) : undefined;

	return (
		<StatCard
			title="야행성 지수 🦉"
			description="자정~오전 6시 커밋 비율"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			suffix="%"
		/>
	);
}
