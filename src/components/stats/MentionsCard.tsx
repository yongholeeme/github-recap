
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMentionsCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';

export default function MentionsCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.mentions.all(),
		queryFn: () => getMentionsCount(),
		
	});

	return (
		<StatCard
			title="멘션"
			description="멘션된 횟수"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
