import { CountUpAnimation } from '@/components/CountUpAnimation';
import { getCommitsCount } from '@/lib/github/commits';;
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export default function TotalCommitsCard() {
	const { data, isLoading, error } = useQuery({
		queryKey: queryKeys.commits.all(),
		queryFn: () => getCommitsCount(),
	});

	return (
		<div className="flex items-center justify-center">
			{isLoading ? (
				<div className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black text-gray-700 animate-pulse">
					···
				</div>
			) : error ? (
				<div className="text-center">
					<div className="text-4xl sm:text-5xl text-red-400 mb-2">오류</div>
					<p className="text-sm text-gray-400">데이터를 불러올 수 없습니다</p>
				</div>
			) : (
				<div className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black text-gray-200 leading-none">
					<CountUpAnimation value={data as number} />
				</div>
			)}
		</div>
	);
}
