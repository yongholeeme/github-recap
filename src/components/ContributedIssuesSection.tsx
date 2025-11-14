import { useYear } from '@/contexts/YearContext';
import BigNumberSection from '@/components/BigNumberSection';
import { useCountOfParticipatedIssues } from '@/lib/hooks/useCountOfParticipatedIssues';
import { useCountOfParticipatedDiscussions } from '@/lib/hooks/useCountOfParticipatedDiscussions';

export default function ContributedIssuesSection() {
	const { year } = useYear();
	
	const { data: issuesCount, isFetching: isFetchingIssues } = useCountOfParticipatedIssues(year);
	const { data: discussionsCount, isFetching: isFetchingDiscussions } = useCountOfParticipatedDiscussions(year);

	// Calculate total participated issues and discussions
	const contributedCount = (issuesCount || 0) + (discussionsCount || 0);

	return (
		<BigNumberSection
			value={contributedCount}
			isFetching={isFetchingIssues || isFetchingDiscussions}
			title="참여한 이슈와 디스커션"
			subtitle="당신의 목소리가 닿은 곳"
		/>
	);
}
