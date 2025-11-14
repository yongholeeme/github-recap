
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMentionedByCount } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';

export default function MentionedByCountCard() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.mentions.received(),
		queryFn: () => getMentionedByCount(),
		
	});

	return (
		<StatCard
			title="멘션 받은 횟수"
			description="다른 사람들이 나를"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
