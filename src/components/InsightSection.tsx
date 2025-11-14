import { type ReactNode, useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

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
	const [showToast, setShowToast] = useState(false);
	const hasShownToast = useRef(false);
	
	const { ref, inView } = useInView({
		threshold: 0.5, // 섹션의 50%가 보일 때 트리거
		triggerOnce: false, // 매번 트리거되도록 설정
        delay: 1000
	});
	
	const medals = ['🥇', '🥈', '🥉'];
	const colors = [
		'from-yellow-400/20 to-amber-400/20 border-yellow-400/30',
		'from-gray-300/20 to-gray-400/20 border-gray-300/30',
		'from-orange-400/20 to-amber-600/20 border-orange-400/30'
	];

	useEffect(() => {
		if (recommendation && inView) {
			// 섹션에 진입했을 때 toast 표시
			setShowToast(true);
			hasShownToast.current = true;
			
			// 3초 후 자동으로 사라짐
			const dismissTimer = setTimeout(() => setShowToast(false), 3000);
			
			return () => {
				clearTimeout(dismissTimer);
			};
		} else if (!inView && hasShownToast.current) {
			// 섹션을 벗어나면 toast 숨김
			setShowToast(false);
		}
	}, [recommendation, inView]);

	return (
		<div ref={ref} className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			{/* Toast Notification - Desktop: top-right, Mobile: bottom-center island */}
			{recommendation && (
				<div 
					className={`fixed z-50 transition-all duration-500
						left-1/2 -translate-x-1/2 bottom-6 w-[calc(100%-2rem)] max-w-sm
						sm:left-auto sm:right-4 sm:top-4 sm:bottom-auto sm:translate-x-0 sm:w-auto sm:max-w-md
						${showToast 
							? 'translate-y-0 opacity-100' 
							: 'translate-y-full opacity-0 sm:translate-y-0 sm:translate-x-full'
						}`}
				>
					<div className="relative bg-gradient-to-br from-blue-500/30 via-cyan-500/30 to-purple-500/30 backdrop-blur-xl border border-white/30 rounded-3xl sm:rounded-2xl p-4 shadow-2xl">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse rounded-3xl sm:rounded-2xl" />
						
						<div className="relative flex items-start gap-3">
							<div className="text-3xl flex-shrink-0">{recommendation.emoji}</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
									<span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
										인사이트
									</span>
									<span className="ml-auto px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-[10px] text-white/90 font-bold">
										{recommendation.badge}
									</span>
								</div>
								<h4 className="text-base font-black text-white mb-1">
									{recommendation.title}
								</h4>
								<p className="text-xs text-white/70 font-medium line-clamp-2">
									{recommendation.subtitle}
								</p>
							</div>
							<button
								onClick={() => setShowToast(false)}
								className="flex-shrink-0 text-white/50 hover:text-white/80 transition-colors"
								aria-label="Close"
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}

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
