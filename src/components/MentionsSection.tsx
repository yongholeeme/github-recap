import MentionedByCountCard from '@/components/stats/MentionedByCountCard';
import TopMentionedByCard from '@/components/stats/TopMentionedByCard';

export default function MentionsSection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Hero-style Main Stat */}
				<div className="text-center mb-16 sm:mb-20 px-2 sm:px-4">
					<p className="text-lg sm:text-xl text-white/60 font-medium mb-6 sm:mb-8 tracking-wide">
						올해 멘션 받은 횟수
					</p>
					<div>
						<MentionedByCountCard />
					</div>
					<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
						당신을 향한 관심
					</p>
				</div>

				{/* Top Mentioners */}
				<div>
					<TopMentionedByCard />
				</div>
			</div>
		</div>
	);
}
