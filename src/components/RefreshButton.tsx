import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function RefreshButton() {
	const queryClient = useQueryClient();
	const [percent, setPercent] = useState(100);
	const [fetchingCount, setFetchingCount] = useState(0);

	const handleRefresh = async () => {
		await queryClient.invalidateQueries();
	};

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe(() => {
			const fetching = queryClient.isFetching();
			const allQueries = queryClient.getQueryCache().getAll();
			const total = allQueries.length;
			const fetchingQueries = allQueries.filter(q => q.state.fetchStatus === 'fetching');
			
			setFetchingCount(fetching);
			
			const completed = total - fetching;
			const newPercent = total > 0 ? Math.round((completed / total) * 100) : 100;
			setPercent(newPercent);

			if (fetchingQueries.length > 0) {
				console.log('🔄 Fetching Queries:', fetchingQueries.map(q => ({
					key: q.queryKey,
					fetchStatus: q.state.fetchStatus,
				})));
			}
		});

		return () => unsubscribe();
	}, [queryClient]);

	const isFetching = fetchingCount > 0;

	return (
		<button
			type="button"
			onClick={handleRefresh}
			disabled={isFetching}
			className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
			title={isFetching ? `데이터 로딩 중... ${percent}%` : "전체 데이터 최신화"}
		>
			<div className="relative">
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
				<div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-sm group-hover:blur-md transition-all duration-300" />
			</div>
			<span className="text-sm font-bold text-white/95 tracking-tight group-hover:text-white transition-colors duration-300">
				{isFetching ? `${percent}%` : '최신화'}
			</span>
		</button>
	);
}
