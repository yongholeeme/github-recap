interface CommitMessageCardProps {
	title: string;
	description: string;
	value: number | undefined;
	commitMessage: string | undefined;
	isLoading: boolean;
	isFetching: boolean;
	error: Error | null;
	onRefetch: () => void;
	onShowMessage?: () => void;
}

export default function CommitMessageCard({
	title,
	description,
	value,
	commitMessage,
	isLoading,
	isFetching,
	error,
	onRefetch,
	onShowMessage,
}: CommitMessageCardProps) {
		const handleRefresh = (e: React.MouseEvent) => {
			e.stopPropagation();
			onRefetch();
		};

		return (
			<div
				className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
					commitMessage ? "cursor-pointer" : ""
				} ${isFetching ? "pointer-events-none" : ""}`}
			>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl group-hover:from-blue-400/30 group-hover:to-cyan-400/30 transition-all duration-500" />
			<div
				className={`relative flex flex-col min-h-[100px] sm:min-h-[120px] justify-between ${
					isFetching ? "opacity-40" : ""
				}`}
				onClick={
					commitMessage && !isFetching ? onShowMessage : undefined
				}
			>
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">
							{title}
						</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">
							{description}
						</p>
					</div>
					<button
						type="button"
						onClick={handleRefresh}
						disabled={isFetching}
						className="flex-shrink-0 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
						title="새로고침"
					>
						<svg
							className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-auto">
					{isLoading && value === undefined && (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
							<p className="text-xs text-gray-400">로딩 중...</p>
						</div>
					)}
					{error && value === undefined && (
						<p className="text-sm text-red-500 font-semibold">오류 발생</p>
					)}
					{error && value !== undefined && (
						<>
							<div className="flex items-center gap-1 mb-2">
								<svg
									className="w-3 h-3 text-red-500"
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
								<p className="text-xs text-red-500">새로고침 실패</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{value.toLocaleString()}
								</p>
								{commitMessage && (
									<span className="text-xs text-gray-400">클릭하여 보기</span>
								)}
							</div>
						</>
					)}
					{!error && value !== undefined && (
						<div className="flex items-center justify-between">
							<p className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
								{value.toLocaleString()}
							</p>
							{commitMessage && (
								<span className="text-xs text-gray-400 group-hover:text-purple-600 transition-colors">
									✨ 보기
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}