import type { ReactNode } from 'react';

interface InsightSectionProps {
	title: string;
	subtitle: string;
	chart: ReactNode;
	topItems?: Array<{
		label: string;
		value: string | number;
		rank: number;
	}>;
	stats?: Array<{
		label: string;
		value: string | number;
	}>;
	isLoading?: boolean;
}

export default function InsightSection({
	title,
	subtitle,
	chart,
	topItems,
	stats,
	isLoading = false
}: InsightSectionProps) {
	const medals = ['🥇', '🥈', '🥉'];
	const colors = [
		'from-yellow-400/20 to-amber-400/20 border-yellow-400/30',
		'from-gray-300/20 to-gray-400/20 border-gray-300/30',
		'from-orange-400/20 to-amber-600/20 border-orange-400/30'
	];

	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
			
			{isLoading && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] z-20" />
			)}

			<div className={`relative z-10 w-full max-w-7xl mx-auto ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
				{/* Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.02em] mb-4">
						{title}
					</h2>
					<p className="text-base sm:text-lg text-white/50 font-medium">
						{subtitle}
					</p>
				</div>

				{/* Chart */}
				<div className="space-y-8">
					{chart}

					{/* Top Items */}
					{topItems && topItems.length > 0 && (
						<div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
							{topItems.slice(0, 3).map((item, index) => (
								<div 
									key={index} 
									className={`relative bg-gradient-to-br ${colors[index]} backdrop-blur-sm border rounded-2xl p-4 text-center transition-transform hover:scale-105`}
								>
									<div className="text-3xl mb-2">{medals[index]}</div>
									<div className="text-2xl sm:text-3xl font-black text-white mb-1">
										{item.label}
									</div>
									<div className="text-sm sm:text-base text-white/60 font-medium">
										{item.value}
									</div>
									{index === 0 && (
										<div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-black px-2 py-1 rounded-full shadow-lg">
											TOP
										</div>
									)}
								</div>
							))}
						</div>
					)}

					{/* Stats Summary */}
					{stats && stats.length > 0 && (
						<div className="mt-10 pt-8 border-t border-white/10">
							<div className={`grid gap-4 ${
								stats.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
								stats.length === 3 ? 'grid-cols-3' :
								stats.length === 2 ? 'grid-cols-2' :
								'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
							}`}>
								{stats.map((stat, index) => (
									<div key={index} className="text-center">
										<div className="text-3xl sm:text-4xl font-black text-white mb-1">
											{stat.value}
										</div>
										<div className="text-xs sm:text-sm text-white/50 font-medium">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
