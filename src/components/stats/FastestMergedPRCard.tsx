import { useQuery } from '@tanstack/react-query';
import { getFastestMergedPR } from '@/lib/github/pullRequests';
import { queryKeys } from '@/lib/queryKeys';
import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';

export default function FastestMergedPRCard() {
	const { year } = useYear();
	const { data, isFetching } = useQuery({
		queryKey: queryKeys.pullRequests.fastest(year),
		queryFn: () => getFastestMergedPR(year),
	});

	if (!data || !data.mergedAt) {
		return (
			<StatCard
				title="가장 빨리 머지된 PR"
				value="-"
				description="머지 속도"
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
		<StatCard
			title="가장 빨리 머지된 PR"
			value={formatTime(hours)}
			description={data.title}
			link={data.url}
			isFetching={isFetching}
		/>
	);
}
