import { useYear } from '@/contexts/YearContext';
import BigNumberSection from '@/components/BigNumberSection';
import { useCountOfParticipatedPrs } from '@/lib/hooks/useCountOfParticipatedPrs';

export default function ContributedPullRequestsSection() {
	const { year } = useYear();
	

	const { data: participatedCount, isFetching: isFetchingParticipated } = useCountOfParticipatedPrs(year);
	
	return (
		<BigNumberSection
			value={participatedCount}
			isFetching={isFetchingParticipated}
			title="기여한 Pull Request"
			subtitle="참여한 PR의 개수"
		/>
	);
}
