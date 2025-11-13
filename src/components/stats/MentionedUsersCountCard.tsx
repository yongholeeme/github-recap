
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMentionedUsersCount } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';

export default function MentionedUsersCountCard() {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: queryKeys.mentions.sent(),
		queryFn: () => getMentionedUsersCount(),
		
	});

	return (
		<StatCard
			title="멘션한 횟수"
			description="내가 다른 사람들을"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
			onRefetch={refetch}
		/>
	);
}
