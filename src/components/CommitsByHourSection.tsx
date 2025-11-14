import MostActiveHourCard from '@/components/stats/MostActiveHourCard';
import NightOwlScoreCard from '@/components/stats/NightOwlScoreCard';
import CommitsByHourChart from '@/components/charts/CommitsByHourChart';

export default function CommitsByHourSection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						당신의
						<br />
						코딩 시간
					</h2>
					<p className="text-lg sm:text-xl text-white/60 font-medium max-w-2xl mx-auto">
						하루 중 언제 가장 몰입하시나요?
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
					<MostActiveHourCard />
					<NightOwlScoreCard />
				</div>

				<CommitsByHourChart />
				
				<div className="mt-8 text-center">
					<p className="text-base sm:text-lg text-white/40 font-medium italic">
						"생산성의 비밀은 당신만의 리듬을 찾는 것"
					</p>
				</div>
			</div>
		</div>
	);
}
