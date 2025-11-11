import TopLanguagesCard from '@/components/stats/TopLanguagesCard';

export default function LanguagesSection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			{/* Section Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-fuchsia-950 to-pink-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
				{/* Section Header */}
				<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-violet-400 via-fuchsia-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl">
						<span className="text-3xl sm:text-4xl md:text-5xl">🌈</span>
					</div>
					<div>
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">
							가장 많이 사용한 언어
						</h3>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">
							당신만의 코딩 팔레트
						</p>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 gap-3 sm:gap-4">
					<TopLanguagesCard />
				</div>
			</div>
		</div>
	);
}
