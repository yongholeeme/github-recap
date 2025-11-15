import StatCard from '@/components/StatCard';
import { useYear } from '@/contexts/YearContext';
import { useMyFastestMergedPr } from '@/lib/hooks/useMyMergedPrs';

export default function FastestMergedPRCard() {
	const { year } = useYear();
	const { data, isFetching } = useMyFastestMergedPr(year);

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
