import CreatedIssuesCard from '@/components/stats/CreatedIssuesCard';
import IssueCommentsCard from '@/components/stats/IssueCommentsCard';
import ParticipatedIssuesCard from '@/components/stats/ParticipatedIssuesCard';
import CreatedDiscussionsCard from '@/components/stats/CreatedDiscussionsCard';
import DiscussionCommentsCard from '@/components/stats/DiscussionCommentsCard';
import ParticipatedDiscussionsCard from '@/components/stats/ParticipatedDiscussionsCard';

export default function IssueActivitySection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						문제를 찾고
						<br />
						해결합니다
					</h2>
					<p className="text-lg sm:text-xl text-gray-400 font-medium">
						이슈와 토론으로 함께 성장하는 커뮤니티
					</p>
				</div>

				{/* Stats Grid - Clean 3x2 layout */}
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					<ParticipatedIssuesCard />
					<CreatedIssuesCard />
					<IssueCommentsCard />
					<ParticipatedDiscussionsCard />
					<CreatedDiscussionsCard />
					<DiscussionCommentsCard />
				</div>
			</div>
		</div>
	);
}
