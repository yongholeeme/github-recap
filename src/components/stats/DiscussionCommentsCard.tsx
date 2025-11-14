import StatCard from '@/components/StatCard';
import { getDiscussionCommentsCount } from '@/lib/github/issues';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';

export default function DiscussionCommentsCard() {
	const { year } = useYear();
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.discussions.comments(year),
		queryFn: () => getDiscussionCommentsCount(year),
	});

	return (
		<StatCard
			title="디스커션 코멘트"
			description="코멘트"
			value={data as number | undefined}
			isFetching={isFetching}
			error={error}
		/>
	);
}
