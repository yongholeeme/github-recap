import { useQuery } from '@tanstack/react-query';
import { getTopMentionedUsers, type MentionDetail } from '@/lib/github/issues';
import { queryKeys } from '@/lib/queryKeys';

export default function TopMentionedUsersCard() {
	const { data, isFetching, error } = useQuery({
		queryKey: queryKeys.mentions.sentTo(),
		queryFn: () => getTopMentionedUsers(),
	});

	return (
		<div
			className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm"
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:from-pink-400/30 group-hover:to-orange-400/30 transition-all duration-500" />
			
			<div className={`relative ${isFetching ? "opacity-40" : ""}`}>
				<div className="flex items-start justify-between gap-2 mb-4">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">
							누구를 가장 많이 멘션했나요?
						</h3>
						<p className="text-[10px] sm:text-xs text-white/60">
							TOP 5 멘션 대상
						</p>
					</div>
				</div>

				{error && (
					<p className="text-sm text-red-400 font-semibold">오류 발생</p>
				)}



				{data && data.length > 0 && (
					<div className="space-y-2">
						{(data as MentionDetail[]).map((item, index) => (
							<div
								key={item.username}
								className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
							>
								<div className="flex items-center gap-2">
									<span className="text-lg font-bold text-white/80 w-6">
										{index + 1}.
									</span>
									<span className="text-sm font-semibold text-white">
										@{item.username}
									</span>
								</div>
								<span className="text-sm font-bold text-purple-400">
									{item.count}회
								</span>
							</div>
						))}
					</div>
				)}

				{data && data.length === 0 && (
					<p className="text-sm text-white/60">데이터가 없습니다</p>
				)}
			</div>
		</div>
	);
}
