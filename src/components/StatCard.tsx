import { CountUpAnimation } from '@/components/CountUpAnimation';

interface StatCardProps {
	title: string;
	description: string;
	value: number | undefined;
	isFetching: boolean;
	error: Error | null;
	isClickable?: boolean;
	onClick?: () => void;
	suffix?: string; // e.g., "%", "일", "개" etc.
}

export default function StatCard({
	title,
	description,
	value,
	isFetching,
	error,
	isClickable,
	onClick,
	suffix,
}: StatCardProps) {

	return (
		<div
			className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 ${
				isClickable ? "cursor-pointer" : ""
			} ${isFetching ? "pointer-events-none opacity-60" : ""}`}
			onClick={
				isClickable && value !== undefined && !isFetching ? onClick : undefined
			}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			
			<div className="relative flex flex-col justify-between min-h-[120px]">
				<div className="mb-4">
					<h3 className="text-sm font-bold text-white mb-1">
						{title}
					</h3>
					<p className="text-xs text-white/60">
						{description}
					</p>
				</div>

				<div className="mt-auto">
					{error && value === undefined && (
						<p className="text-sm text-red-400 font-semibold">오류 발생</p>
					)}
					{error && value !== undefined && (
						<>
							<div className="flex items-center gap-1 mb-2">
								<svg
									className="w-3 h-3 text-red-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-xs text-red-400">새로고침 실패</p>
							</div>
							<div className="flex items-baseline gap-1 flex-wrap">
								<span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
									{value.toLocaleString()}
								</span>
								{suffix && <span className="text-2xl sm:text-3xl font-bold text-white/80">{suffix}</span>}
								{isClickable && (
									<span className="text-xs text-white/50 ml-auto">클릭하여 보기</span>
								)}
							</div>
						</>
					)}
					{!error && value !== undefined && (
						<div className="flex items-baseline gap-1 flex-wrap">
							<span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
								<CountUpAnimation value={value} />
							</span>
							{suffix && (
								<span className="text-2xl sm:text-3xl font-bold text-white/80">{suffix}</span>
							)}
							{isClickable && (
								<span className="text-xs text-white/50 ml-auto">클릭하여 보기</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}