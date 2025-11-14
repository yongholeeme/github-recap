import { useQueryClient } from "@tanstack/react-query";

export default function RefreshButton() {
	const queryClient = useQueryClient();
	const isFetching = queryClient.isFetching() > 0;

	const handleRefresh = async () => {
		// 모든 쿼리 캐시 무효화
		await queryClient.invalidateQueries();
	};



	return (
		<button
			type="button"
			onClick={handleRefresh}
			disabled={isFetching}
			className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl group"
			title="전체 데이터 새로고침"
		>
			<svg
				className={`w-5 h-5 text-white ${isFetching ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
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
	);
}
