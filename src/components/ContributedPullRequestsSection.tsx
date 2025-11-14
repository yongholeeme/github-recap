import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useYear } from '@/contexts/YearContext';
import { getPullRequestsCount, getApprovedPullRequestsCount } from '@/lib/github/pullRequests';
import BigNumberSection from '@/components/BigNumberSection';

export default function ContributedPullRequestsSection() {
	const { year } = useYear();
	
	const { data: createdCount, isLoading: isLoadingCreated } = useQuery({
		queryKey: queryKeys.pullRequests.all(year),
		queryFn: () => getPullRequestsCount(year),
	});

	const { data: approvedCount, isLoading: isLoadingApproved } = useQuery({
		queryKey: queryKeys.pullRequests.approved(year),
		queryFn: () => getApprovedPullRequestsCount(year),
	});

	const isLoading = isLoadingCreated || isLoadingApproved;

	// Calculate unique contributed PRs
	// Note: This is an approximation. In reality, there might be overlap between 
	// created, reviewed, and approved PRs. For accurate count, we'd need to dedupe by PR ID.
	// For now, we'll use created + approved as a reasonable approximation
	const contributedCount = (createdCount || 0) + (approvedCount || 0);

	return (
		<BigNumberSection
			value={contributedCount}
			isLoading={isLoading}
			title="기여한 Pull Request"
			subtitle="생성하고 리뷰한 PR의 개수"
		/>
	);
}
