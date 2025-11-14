import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';

export default function KeyboardHint() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Hide hint after any keyboard interaction
		const handleKeyDown = () => {
			setIsVisible(false);
		};

		// Hide hint after scroll
		const handleScroll = () => {
			setIsVisible(false);
		};

		// Auto-hide after 5 seconds
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('scroll', handleScroll, true);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, []);

	return (
		<Toast isVisible={isVisible} position="bottom-center">
			<div className="flex-1 flex items-center gap-4 sm:gap-6">
				{/* Previous */}
				<div className="flex items-center gap-2">
					<div className="flex gap-1">
						<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white/90">↑</kbd>
						<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white/90">←</kbd>
					</div>
					<span className="text-xs text-white/60 font-medium">이전</span>
				</div>

				<div className="w-px h-6 bg-white/20" />

				{/* Next */}
				<div className="flex items-center gap-2">
					<div className="flex gap-1">
						<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white/90">↓</kbd>
						<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white/90">→</kbd>
						<kbd className="px-3 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white/90">Space</kbd>
					</div>
					<span className="text-xs text-white/60 font-medium">다음</span>
				</div>
			</div>
		</Toast>
	);
}
