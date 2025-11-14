import CommitsByDayChart from '@/components/charts/CommitsByDayChart';

export default function CommitsByDaySection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						일주일의
						<br />
						코딩 습관
					</h2>
					<p className="text-lg sm:text-xl text-white/60 font-medium max-w-2xl mx-auto">
						어느 요일에 가장 활발하게 작업하셨나요?
					</p>
				</div>

				<CommitsByDayChart />
				
				<div className="mt-8 text-center">
					<p className="text-base sm:text-lg text-white/40 font-medium italic">
						"일관성이 만드는 작은 기적들"
					</p>
				</div>
			</div>
		</div>
	);
}
