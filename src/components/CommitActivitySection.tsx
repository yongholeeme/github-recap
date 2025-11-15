import { useYear } from '@/contexts/YearContext';
import BigNumberSection from '@/components/BigNumberSection';
import { useCountOfCommits } from "@/lib/hooks/useCountOfCommits";

export default function CommitActivitySection() {
	const { year } = useYear();
	const { data, isFetching } = useCountOfCommits(year);
	
	return (
		<BigNumberSection
			value={data}
			isFetching={isFetching}
			title={`${year}년 작성한 커밋`}
			subtitle="한 줄 한 줄 쌓아올린 당신의 기록"
		/>
	);
}
