import { useQuery } from '@tanstack/react-query';
import { getAverageMergeTime } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function AverageMergeTimeCard() {
	const { year } = useYear();
	const { data, isLoading } = useQuery({
		queryKey: queryKeys.pullRequests.averageMergeTime(year),
		queryFn: () => getAverageMergeTime(year),
	});

	if (data === null || data === undefined) {
		return (
			<DetailCard
				title="PR 평균 머지 속도"
				value="-"
				subtitle="생성부터 머지까지"
				isLoading={isLoading}
			/>
		);
	}

	const formatTime = (hours: number) => {
		if (hours < 1) {
			return `${Math.round(hours * 60)}분`;
		} else if (hours < 24) {
			return `${Math.round(hours)}시간`;
		} else {
			const days = Math.floor(hours / 24);
			const remainingHours = Math.round(hours % 24);
			return remainingHours > 0 ? `${days}일 ${remainingHours}시간` : `${days}일`;
		}
	};

	return (
		<DetailCard
			title="PR 평균 머지 속도"
			value={formatTime(data)}
			subtitle="생성부터 머지까지"
			isLoading={isLoading}
		/>
	);
}
