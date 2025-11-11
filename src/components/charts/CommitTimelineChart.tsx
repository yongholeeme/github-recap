import ChartCard from '@/components/ChartCard';
import type { CommitData } from '@/lib/github/commits';
import { useCommitsData } from '@/lib/hooks/useCommitsData';

function calculateCommitTimeline(
  commits: CommitData
): Array<{ month: string; count: number }> {
  const monthNames = [
	"1월",
	"2월",
	"3월",
	"4월",
	"5월",
	"6월",
	"7월",
	"8월",
	"9월",
	"10월",
	"11월",
	"12월",
  ];
  const monthCounts: Record<number, number> = {};

  // Initialize all months with 0
  for (let i = 0; i < 12; i++) {
	monthCounts[i] = 0;
  }

  for (const item of commits) {
	const date = new Date(item.commit.author?.date || "");
	const month = date.getMonth();
	monthCounts[month] = (monthCounts[month] || 0) + 1;
  }

  return Object.entries(monthCounts).map(([month, count]) => ({
	month: monthNames[Number(month)],
	count,
  }));
}

export default function CommitTimelineChart() {
	const { data: commits, isLoading, isFetching, error, refetch, ref } = useCommitsData();
	
	const data = commits ? calculateCommitTimeline(commits) : undefined;

	return (
		<ChartCard
			ref={ref}
			title="월별 커밋 타임라인"
			description="올해 월별 커밋 활동 추세"
			data={data}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
			dataKey="month"
		/>
	);
}
