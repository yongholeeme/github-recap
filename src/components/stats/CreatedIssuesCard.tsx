import StatCard from '@/components/StatCard';
import { getIssuesCount } from '@/lib/github/issues';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function CreatedIssuesCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.issues.all(),
		queryFn: () => getIssuesCount(),
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
