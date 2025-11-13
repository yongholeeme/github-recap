import TotalCommitsCard from '@/components/stats/TotalCommitsCard';
import LongestCommitCard from '@/components/stats/LongestCommitCard';
import ShortestCommitCard from '@/components/stats/ShortestCommitCard';
import AverageCommitMessageLengthCard from '@/components/stats/AverageCommitMessageLengthCard';
import ActiveDaysCard from '@/components/stats/ActiveDaysCard';

export default function CommitActivitySection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			{/* Section Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Hero-style Main Stat */}
				<div className="text-center mb-16 sm:mb-20">
					<p className="text-lg sm:text-xl text-gray-400 font-medium mb-4 tracking-wide">
						올해 작성한 커밋
					</p>
					<div className="mb-8">
						<TotalCommitsCard />
					</div>
					<p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
						한 줄 한 줄 쌓아올린 당신의 기록
					</p>
				</div>

				{/* Secondary Stats Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					<ActiveDaysCard />
					<LongestCommitCard />
					<ShortestCommitCard />
					<AverageCommitMessageLengthCard />
				</div>
			</div>
		</div>
	);
}
