
import StatCard from '@/components/StatCard';
import { useInViewQuery } from '@/lib/hooks/useInViewQuery';
import { getMentionsCount } from '@/lib/github/issues';;
import { queryKeys } from '@/lib/queryKeys';

export default function MentionsCard() {
	const { data, isLoading, isFetching, error, refetch, ref } = useInViewQuery({
		queryKey: queryKeys.mentions(),
		queryFn: () => getMentionsCount(),
		
	});

	return (
		<StatCard
			ref={ref}
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
