interface DetailCardProps {
	title: string;
	value: string;
	subtitle?: string;
	description?: string;
	link?: string;
	isLoading: boolean;
}

export default function DetailCard({
	title,
	value,
	subtitle,
	description,
	link,
	isLoading,
}: DetailCardProps) {
	const content = (
		<div
			className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 ${
				link ? "cursor-pointer" : ""
			} ${isLoading ? "pointer-events-none opacity-60" : ""}`}
		>
			{isLoading && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			
			<div className="relative flex flex-col justify-between min-h-[120px]">
				<div className="mb-4">
					<h3 className="text-sm font-bold text-white mb-1">
						{title}
					</h3>
					{subtitle && (
						<p className="text-xs text-white/60 line-clamp-2">
							{subtitle}
						</p>
					)}
				</div>

				<div className="mt-auto">
					<div className="flex items-baseline gap-2 flex-wrap mb-1">
						<span className="text-3xl sm:text-4xl font-black text-white">
							{value}
						</span>
						{link && (
							<svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						)}
					</div>
					{description && (
						<p className="text-xs text-white/50">
							{description}
						</p>
					)}
				</div>
			</div>
		</div>
	);

	if (link) {
		return (
			<a href={link} target="_blank" rel="noopener noreferrer" className="block">
				{content}
			</a>
		);
	}

	return content;
}
