import { useQuery } from "@tanstack/react-query";
import { getCommitsCount } from "@/lib/github/commits";
import { queryKeys } from "@/lib/queryKeys";
import { CountUpAnimation } from "@/components/CountUpAnimation";
import LongestCommitCard from '@/components/stats/LongestCommitCard';
import ShortestCommitCard from '@/components/stats/ShortestCommitCard';
import AverageCommitMessageLengthCard from '@/components/stats/AverageCommitMessageLengthCard';

export default function CommitActivitySection() {
	const { data: commitsCount, isLoading } = useQuery({
		queryKey: queryKeys.commits.all(),
		queryFn: () => getCommitsCount(),
	});
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			{/* Section Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Hero-style Main Stat - 임팩트 있는 커밋 수 표시 */}
				<div className="text-center mb-16 sm:mb-20 px-2 sm:px-4">
					<p className="text-lg sm:text-xl text-white/60 font-medium mb-6 sm:mb-8 tracking-wide">
						올해 작성한 커밋
					</p>
					
					{/* 거대한 커밋 수 */}
					<div className="mb-6 sm:mb-8 py-4 sm:py-8">
						{isLoading ? (
							<div className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black text-white/20 leading-none animate-pulse">
								···
							</div>
						) : (
							<div className="relative inline-block px-2 sm:px-4">
								{/* Glow effect behind number */}
								<div className="absolute inset-0 blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none">
									<div className="text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
										{commitsCount}
									</div>
								</div>
								{/* Main number */}
								<div className="relative text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent leading-none tracking-tighter">
									<CountUpAnimation value={commitsCount || 0} />
								</div>
							</div>
						)}
					</div>
					
					<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
						한 줄 한 줄 쌓아올린 당신의 기록
					</p>
				</div>

				{/* Secondary Stats Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					<LongestCommitCard />
					<ShortestCommitCard />
					<AverageCommitMessageLengthCard />
				</div>
			</div>
		</div>
	);
}
