import { useQuery } from '@tanstack/react-query';
import { getSlowestMergedPR } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import DetailCard from '@/components/DetailCard';
import { useYear } from '@/contexts/YearContext';

export default function SlowestMergedPRCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.pullRequests.slowest(year),
		queryFn: () => getSlowestMergedPR(year),
	});

	if (!data || !data.mergedAt) {
		return (
			<DetailCard
				title="머지까지 가장 오래 걸린 PR"
				value="-"
				subtitle="머지 속도"
				isFetching={isFetching}
			/>
		);
	}

	const hours = (new Date(data.mergedAt).getTime() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60);
	
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
			title="머지까지 가장 오래 걸린 PR"
			value={formatTime(hours)}
			subtitle={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
