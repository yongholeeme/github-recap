import StatCard from '@/components/StatCard';
import { getIssuesCount } from '@/lib/github/issues';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function CreatedIssuesCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.all(year),
		queryFn: () => getIssuesCount(year),
	});

	return (
		<StatCard
			title="생성한 이슈"
			description="작성한 이슈"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
