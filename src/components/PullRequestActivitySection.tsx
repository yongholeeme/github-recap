import CreatedPullRequestsCard from '@/components/stats/CreatedPullRequestsCard';
import MergedPullRequestsCard from '@/components/stats/MergedPullRequestsCard';
import ClosedNotMergedPullRequestsCard from '@/components/stats/ClosedNotMergedPullRequestsCard';
import PullRequestReviewsCard from '@/components/stats/PullRequestReviewsCard';
import PullRequestReviewCommentsCard from '@/components/stats/PullRequestReviewCommentsCard';
import ApprovedPullRequestsCard from '@/components/stats/ApprovedPullRequestsCard';
import RequestedChangesPullRequestsCard from '@/components/stats/RequestedChangesPullRequestsCard';

export default function PullRequestActivitySection() {
	return (
		<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 w-full max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16 sm:mb-20">
					<h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-200 leading-[0.9] tracking-[-0.02em] mb-6">
						함께 만드는
						<br />
						더 나은 코드
					</h2>
					<p className="text-lg sm:text-xl text-gray-400 font-medium">
						Pull Request로 협업하고 성장합니다
					</p>
				</div>

				{/* Main Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
					<CreatedPullRequestsCard />
					<MergedPullRequestsCard />
					<PullRequestReviewsCard />
				</div>

				{/* Review Details */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					<PullRequestReviewCommentsCard />
					<ApprovedPullRequestsCard />
					<RequestedChangesPullRequestsCard />
					<ClosedNotMergedPullRequestsCard />
				</div>
			</div>
		</div>
	);
}
