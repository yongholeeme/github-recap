import { PAT_STORAGE_KEY } from '@/constants/storage';
import { useQueryClient } from '@tanstack/react-query';

export default function ClearDataButton() {
	const queryClient = useQueryClient();

	const handleClearData = () => {
		if (confirm('모든 캐시 데이터를 삭제하시겠습니까? (개발용)')) {
			// PAT 토큰 백업
			const patToken = sessionStorage.getItem(PAT_STORAGE_KEY);
			
			// 캐시 및 스토리지 삭제
			queryClient.clear();
			sessionStorage.clear();
			localStorage.clear();
			
			// PAT 토큰 복원
			if (patToken) {
				sessionStorage.setItem(PAT_STORAGE_KEY, patToken);
			}
			
			window.location.reload();
		}
	};

	return (
		<button
			onClick={handleClearData}
			className="fixed top-6 left-20 sm:top-8 sm:left-24 z-50 px-3 py-3 bg-red-500/90 hover:bg-red-600 text-white rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center gap-2 group"
			title="캐시 데이터 초기화 (개발용)"
		>
			<svg
				className="w-5 h-5 transition-transform duration-200"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
			<span className="text-sm font-semibold">초기화</span>
		</button>
	);
}
