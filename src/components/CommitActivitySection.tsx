import { useQuery } from "@tanstack/react-query";
import { getCommitsCount } from "@/lib/github/commits";
import { queryKeys } from "@/lib/queryKeys";
import { useYear } from '@/contexts/YearContext';
import BigNumberSection from '@/components/BigNumberSection';

export default function CommitActivitySection() {
	const { year } = useYear();
	const { data: commitsCount, isLoading } = useQuery({
		queryKey: queryKeys.commits.all(year),
		queryFn: () => getCommitsCount(year),
	});
	
	return (
		<BigNumberSection
			value={commitsCount}
			isLoading={isLoading}
			title={`${year}년 작성한 커밋`}
			subtitle="한 줄 한 줄 쌓아올린 당신의 기록"
		/>
	);
}
