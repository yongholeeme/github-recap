import type { User } from "@supabase/supabase-js";
import StatCard from "./StatCard";
import CommitMessageCard from "./CommitMessageCard";
import {
	getCommitsCount,
	getLongestCommitMessage,
	getShortestCommitMessage,
	getAverageCommitMessageLength,
	getLatestCommitHour,
	getActiveDaysCount,
	getLongestStreak,
	getMostActiveHour,
} from "../lib/github";

interface CommitActivitySectionProps {
	user: User;
}

export default function CommitActivitySection({
	user,
}: CommitActivitySectionProps) {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			{/* Section Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
				{/* Section Header */}
				<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl">
						<span className="text-3xl sm:text-4xl md:text-5xl">💻</span>
					</div>
					<div>
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">
							커밋의 기록
						</h3>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">
							매일매일, 한 줄 한 줄 쌓아온 당신의 흔적
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
					<StatCard
						title="총 커밋"
						description="올해 작성한 커밋"
						queryKey={["github-commits", user?.id]}
						queryFn={() => getCommitsCount()}
						enabled={!!user}
					/>
					<CommitMessageCard
						title="가장 긴 커밋"
						description="가장 긴 커밋 메시지 길이"
						queryKey={["github-longest-commit-message", user?.id]}
						queryFn={() => getLongestCommitMessage()}
						enabled={!!user}
						onShowMessage={(data) => {
							window.open(data.url, "_blank");
						}}
					/>
					<CommitMessageCard
						title="가장 짧은 커밋"
						description="가장 짧은 커밋 메시지 길이"
						queryKey={["github-shortest-commit-message", user?.id]}
						queryFn={() => getShortestCommitMessage()}
						enabled={!!user}
						onShowMessage={(data) => {
							window.open(data.url, "_blank");
						}}
					/>
					<StatCard
						title="평균 커밋 메시지 길이"
						description="커밋 메시지 평균 글자 수"
						queryKey={["github-average-commit-message", user?.id]}
						queryFn={() => getAverageCommitMessageLength()}
						enabled={!!user}
					/>
					<StatCard
						title="최근 커밋 시간"
						description="가장 최근 커밋한 시간 (24시간 기준)"
						queryKey={["github-latest-commit-hour", user?.id]}
						queryFn={() => getLatestCommitHour()}
						enabled={!!user}
					/>
					<StatCard
						title="활동한 날"
						description="기여한 날짜 수"
						queryKey={["github-active-days", user?.id]}
						queryFn={() => getActiveDaysCount()}
						enabled={!!user}
					/>
					<StatCard
						title="최장 연속 기여"
						description="연속으로 기여한 최대 일수"
						queryKey={["github-longest-streak", user?.id]}
						queryFn={() => getLongestStreak()}
						enabled={!!user}
					/>
					<StatCard
						title="가장 활발한 시간"
						description="커밋이 가장 많은 시간대"
						queryKey={["github-most-active-hour", user?.id]}
						queryFn={() => getMostActiveHour()}
						enabled={!!user}
					/>
				</div>
			</div>
		</div>
	);
}
