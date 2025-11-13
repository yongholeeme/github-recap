import CommitsByHourChart from '@/components/charts/CommitsByHourChart';
import CommitsByDayChart from '@/components/charts/CommitsByDayChart';
import CommitTimelineChart from '@/components/charts/CommitTimelineChart';
import MostActiveHourCard from '@/components/stats/MostActiveHourCard';
import NightOwlScoreCard from '@/components/stats/NightOwlScoreCard';

export default function CommitPatternsSection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-pink-950 to-rose-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						당신의 코딩 리듬
					</h2>
					<p className="text-lg sm:text-xl text-gray-400 font-medium">
						언제 가장 활발하게 코드를 작성하셨나요?
					</p>
				</div>

				{/* Pattern Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
					<MostActiveHourCard />
					<NightOwlScoreCard />
				</div>

				{/* Charts */}
				<div className="space-y-6 sm:space-y-8">
					<CommitsByHourChart />
					<CommitsByDayChart />
					<CommitTimelineChart />
				</div>
			</div>
		</div>
	);
}
