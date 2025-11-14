
import { CountUpAnimation } from '@/components/CountUpAnimation';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getMentionsCount } from '@/lib/github/issues';

export default function MentionedByCountCard() {
	const { data, isLoading, error } = useQuery({
		queryKey: queryKeys.mentions.received(),
		queryFn: () => getMentionsCount(),
	});

	return (
		<div className="py-4 sm:py-8">
			{isLoading ? (
				<div className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black text-white/20 leading-none animate-pulse">
					···
				</div>
			) : error ? (
				<div className="text-center">
					<div className="text-4xl sm:text-5xl text-red-400 mb-2">오류</div>
					<p className="text-sm text-gray-400">데이터를 불러올 수 없습니다</p>
				</div>
			) : (
				<div className="relative inline-block px-2 sm:px-4">
					{/* Glow effect behind number */}
					<div className="absolute inset-0 blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none">
						<div className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
							{data}
						</div>
					</div>
					{/* Main number */}
					<div className="relative text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent leading-none tracking-tighter">
						<CountUpAnimation value={data as number || 0} />
					</div>
				</div>
			)}
		</div>
	);
}
