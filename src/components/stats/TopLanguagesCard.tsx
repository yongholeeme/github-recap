import { useMemo } from "react";
import { calculateTopLanguages } from "../../lib/github";
import { useRepositoriesData } from "../../lib/hooks";

export default function TopLanguagesCard() {
	const { data: repos, isLoading, isFetching, error, refetch } = useRepositoriesData();
	
	const data = useMemo(() => {
		if (!repos) return undefined;
		return calculateTopLanguages(repos);
	}, [repos]);

	const handleRefresh = () => {
		refetch();
	};

	return (
		<div
			className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
				isFetching ? "pointer-events-none" : ""
			}`}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl group-hover:from-green-400/30 group-hover:to-cyan-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:from-yellow-400/30 group-hover:to-orange-400/30 transition-all duration-500" />
			<div
				className={`relative flex flex-col min-h-[200px] justify-between ${
					isFetching ? "opacity-40" : ""
				}`}
			>
				<div className="flex items-start justify-between gap-2 mb-4">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">
							가장 많이 사용한 언어 🌈
						</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">
							올해 가장 활발하게 사용한 프로그래밍 언어
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
					{error && (
						<p className="text-sm text-red-400 font-semibold">오류 발생</p>
					)}
					{!error && isLoading && (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
							<p className="text-xs text-white/60">로딩 중...</p>
						</div>
					)}
					{!error && data && data.length > 0 && (
						<div className="space-y-3">
							{data.map((lang, index) => (
								<div key={lang.language} className="space-y-1">
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<span className="text-white/80 font-semibold">
												{index + 1}.
											</span>
											<span className="text-white font-bold">
												{lang.language}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-white/60 text-[10px]">
												{lang.count}개 저장소
											</span>
											<span className="text-white font-semibold">
												{lang.percentage}%
											</span>
										</div>
									</div>
									<div className="h-2 bg-white/10 rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
											style={{ width: `${lang.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					)}
					{!error && data && data.length === 0 && (
						<p className="text-xs text-white/60">데이터가 없습니다</p>
					)}
				</div>
			</div>
		</div>
	);
}
