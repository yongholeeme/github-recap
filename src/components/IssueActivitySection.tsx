import type { User } from "@supabase/supabase-js";
import StatCard from "./StatCard";
import {
	getIssuesCount,
	getClosedIssuesCount,
	getIssueCommentsCount,
	getMentionsCount,
} from "../lib/github";

interface IssueActivitySectionProps {
	user: User;
}

export default function IssueActivitySection({
	user,
}: IssueActivitySectionProps) {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
				<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl shadow-2xl">
						<span className="text-3xl sm:text-4xl md:text-5xl">🎯</span>
					</div>
					<div>
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">
							문제 해결사
						</h3>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">
							이슈로 시작해, 해결로 끝나는 당신의 여정
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
					<StatCard
						title="생성한 이슈"
						description="작성한 이슈"
						queryKey={["github-issues", user?.id]}
						queryFn={() => getIssuesCount()}
						enabled={!!user}
					/>
					<StatCard
						title="닫은 이슈"
						description="해결한 이슈"
						queryKey={["github-closed-issues", user?.id]}
						queryFn={() => getClosedIssuesCount()}
						enabled={!!user}
					/>
					<StatCard
						title="이슈 댓글"
						description="이슈 토론 참여"
						queryKey={["github-issue-comments", user?.id]}
						queryFn={() => getIssueCommentsCount()}
						enabled={!!user}
					/>
					<StatCard
						title="멘션"
						description="멘션된 횟수"
						queryKey={["github-mentions", user?.id]}
						queryFn={() => getMentionsCount()}
						enabled={!!user}
					/>
				</div>
			</div>
		</div>
	);
}
