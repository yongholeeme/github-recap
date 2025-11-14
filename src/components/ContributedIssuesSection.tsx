import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';
import { getParticipatedIssuesCount, getParticipatedDiscussionsCount } from '@/lib/github/issues';
import BigNumberSection from '@/components/BigNumberSection';

export default function ContributedIssuesSection() {
	const { year } = useYear();
	
	const { data: issuesCount, isLoading: isLoadingIssues } = useQuery({
		queryKey: queryKeys.issues.participated(year),
		queryFn: () => getParticipatedIssuesCount(year),
	});

	const { data: discussionsCount, isLoading: isLoadingDiscussions } = useQuery({
		queryKey: queryKeys.discussions.participated(year),
		queryFn: () => getParticipatedDiscussionsCount(year),
	});

	const isLoading = isLoadingIssues || isLoadingDiscussions;

	// Calculate total participated issues and discussions
	const contributedCount = (issuesCount || 0) + (discussionsCount || 0);

	return (
		<BigNumberSection
			value={contributedCount}
			isLoading={isLoading}
			title="참여한 이슈와 디스커션"
			subtitle="당신의 목소리가 닿은 곳"
		/>
	);
}
