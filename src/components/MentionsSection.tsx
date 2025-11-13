import MentionedByCountCard from '@/components/stats/MentionedByCountCard';
import TopMentionedByCard from '@/components/stats/TopMentionedByCard';

export default function MentionsSection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						커뮤니티와
						<br />
						연결됩니다
					</h2>
					<p className="text-lg sm:text-xl text-gray-400 font-medium">
						함께 나눈 대화의 기록
					</p>
				</div>

				{/* Content */}
				<div className="space-y-6 sm:space-y-8">
					<MentionedByCountCard />
					<TopMentionedByCard />
				</div>
			</div>
		</div>
	);
}
