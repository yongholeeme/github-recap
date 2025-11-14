import type { ReactNode } from 'react';

interface InsightSectionProps {
	title: string;
	subtitle: string;
	recommendation?: {
		emoji: string;
		title: string;
		subtitle: string;
		badge: string;
	};
	chart: ReactNode;
	topItems?: Array<{
		label: string;
		value: string | number;
		subvalue?: string;
		rank: number;
	}>;
	stats?: Array<{
		label: string;
		value: string | number;
	}>;
}

export default function InsightSection({
	title,
	subtitle,
	recommendation,
	chart,
	topItems,
	stats
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

			<div className="relative z-10 w-full max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.02em] mb-4">
						{title}
					</h2>
					<p className="text-base sm:text-lg text-white/50 font-medium">
						{subtitle}
					</p>
				</div>

				{/* Recommendation Card */}
				{recommendation && (
					<div className="mb-8 sm:mb-10">
						<div className="relative bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 overflow-hidden">
							{/* Animated background glow */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
							
							<div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
								<div className="flex items-center gap-3 sm:gap-4">
									<div className="text-3xl sm:text-4xl flex-shrink-0">{recommendation.emoji}</div>
									<div className="text-center sm:text-left">
										<div className="inline-flex items-center gap-2 mb-1">
											<div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
											<span className="text-[10px] sm:text-xs text-cyan-300 font-bold uppercase tracking-wider">
												인사이트
											</span>
										</div>
										<h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-0.5">
											{recommendation.title}
										</h3>
										<p className="text-xs sm:text-sm text-white/70 font-medium">
											{recommendation.subtitle}
										</p>
									</div>
								</div>
								
								<div className="flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
									<span className="text-xs sm:text-sm text-white/90 font-bold">
										{recommendation.badge}
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

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
										{item.subvalue && <span className="text-xs ml-1">{item.subvalue}</span>}
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
