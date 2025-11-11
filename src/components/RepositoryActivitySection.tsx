import type { User } from "@supabase/supabase-js";
import StatCard from "./StatCard";
import {
	getCreatedReposCount,
	getContributedReposCount,
	getTotalStarsReceived,
	getTotalForksReceived,
} from "../lib/github";

interface RepositoryActivitySectionProps {
	user: User;
}

export default function RepositoryActivitySection({
	user,
}: RepositoryActivitySectionProps) {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-indigo-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
				<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl">
						<span className="text-3xl sm:text-4xl md:text-5xl">📦</span>
					</div>
					<div>
						<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">
							프로젝트 빌더
						</h3>
						<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">
							세상에 공유한 당신의 창작물
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
					<StatCard
						title="생성한 저장소"
						description="올해 생성한 저장소"
						queryKey={["github-created-repos", user?.id]}
						queryFn={() => getCreatedReposCount()}
						enabled={!!user}
					/>
					<StatCard
						title="기여한 외부 저장소"
						description="다른 저장소 기여"
						queryKey={["github-contributed-repos", user?.id]}
						queryFn={() => getContributedReposCount()}
						enabled={!!user}
					/>
					<StatCard
						title="받은 스타"
						description="모든 저장소의 스타"
						queryKey={["github-total-stars", user?.id]}
						queryFn={() => getTotalStarsReceived()}
						enabled={!!user}
					/>
					<StatCard
						title="받은 포크"
						description="모든 저장소의 포크"
						queryKey={["github-total-forks", user?.id]}
						queryFn={() => getTotalForksReceived()}
						enabled={!!user}
					/>
				</div>
			</div>
		</div>
	);
}
