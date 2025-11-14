
import StatCard from '@/components/StatCard';
import { useQuery } from '@tanstack/react-query';
import { getMentionedUsersCount } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function MentionedUsersCountCard() {
	const { year } = useYear();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.mentions.sent(year),
		queryFn: () => getMentionedUsersCount(year),
		
	});

	return (
		<StatCard
			title="멘션한 횟수"
			description="내가 다른 사람들을"
			value={data as number | undefined}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		/>
	);
}
