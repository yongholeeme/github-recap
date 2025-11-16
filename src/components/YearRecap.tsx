import { useEffect, useState, useRef } from "react";
import HeroSection from '@/components/HeroSection';
import CommitActivitySection from '@/components/CommitActivitySection';
import CommitsByHourSection from '@/components/CommitsByHourSection';
import CommitsByDaySection from '@/components/CommitsByDaySection';
import CommitTimelineSection from '@/components/CommitTimelineSection';
import IssueActivitySection from '@/components/IssueActivitySection';
import PullRequestActivitySection from '@/components/PullRequestActivitySection';
import ContributedPullRequestsSection from '@/components/ContributedPullRequestsSection';
import ContributedIssuesSection from '@/components/ContributedIssuesSection';
import MentionsSection from '@/components/MentionsSection';
import GrowthSection from '@/components/GrowthSection';
import EndingSection from '@/components/EndingSection';
import RefreshButton from '@/components/RefreshButton';
import LoginModal from '@/components/LoginModal';
import LoginToast from '@/components/LoginToast';
import { YearProvider } from '@/contexts/YearContext';
import { config } from "@/../config";
import { useQueryClient } from "@tanstack/react-query";
import { PAT_STORAGE_KEY, REACT_QUERY_CACHE_STORAGE_KEY } from "@/constants/storage";
import type { User } from "@/types/user";
import { UserProvider } from "@/contexts/UserContext";

interface YearRecapProps {
	year?: number;
}

export default function YearRecap({ year }: YearRecapProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient()

	// Default to current year if not specified
	const targetYear = year || new Date().getFullYear();
	
	// TODO: Use targetYear to filter data in the future

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isLoginModalOpen) return;

			const container = containerRef.current;
			if (!container) return;

			// Next section: ArrowDown, ArrowRight, Space
			if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space') {
				e.preventDefault();
				container.scrollBy({
					top: window.innerHeight,
					behavior: 'smooth'
				});
			}
			// Previous section: ArrowUp, ArrowLeft
			else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
				e.preventDefault();
				container.scrollBy({
					top: -window.innerHeight,
					behavior: 'smooth'
				});
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isLoginModalOpen]);

	useEffect(() => {
		// Check for PAT in sessionStorage
		const pat = sessionStorage.getItem(PAT_STORAGE_KEY);
		if (pat) {
			// Fetch user info with PAT
			const fetchPATUser = async () => {
				try {
					const { Octokit } = await import('octokit');
					const octokit = new Octokit({ auth: pat, baseUrl: config.github.baseUrl });
					const { data } = await octokit.rest.users.getAuthenticated();
					
					// Create a pseudo User object with GitHub data
					// Use avatar_url from API response (handles redirects properly)
					setUser({
						avatar_url: data.avatar_url,
						user_name: data.login,
					} );
				} catch (error) {
					console.error('Failed to fetch PAT user:', error);
					// Invalid PAT, remove it and clear cache
					sessionStorage.removeItem(PAT_STORAGE_KEY);
					queryClient.clear();
					localStorage.removeItem(REACT_QUERY_CACHE_STORAGE_KEY);
					setUser(null);
				} finally {
					setIsLoading(false);
				}
			};
			fetchPATUser();
			return;
		}

		setIsLoading(false);
	}, [queryClient]);

	const handleLogin = (newUser: User) => {
		// Clear previous user's cache
		queryClient.clear();
		localStorage.removeItem(REACT_QUERY_CACHE_STORAGE_KEY);
		setUser(newUser);
	};

	const handleLogout = () => {
		// Clear all React Query cache
		queryClient.clear();
		// Clear localStorage cache
		localStorage.removeItem(REACT_QUERY_CACHE_STORAGE_KEY);
		// Clear session token
		sessionStorage.removeItem(PAT_STORAGE_KEY);
		// Reset user state
		setUser(null);
	};

	return (
		<UserProvider user={user}>
			<YearProvider year={targetYear}>
				{user && (
					<>
						<RefreshButton />
					</>
				)}
				
				{!user && !isLoading && (
					<LoginToast onLoginClick={() => setIsLoginModalOpen(true)} />
				)}

				<LoginModal 
					isOpen={isLoginModalOpen} 
					onClose={() => setIsLoginModalOpen(false)}
					onLogin={handleLogin}
				/>

				<div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
					{/* 시작 그룹 */}
					<div className="snap-start">
						<HeroSection user={user} onLogout={handleLogout} />
					</div>

							{/* 커밋 섹션들 - 블루 계열 배경 */}
							<div className="bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950">
								<CommitActivitySection />
								<CommitsByHourSection />
								<CommitsByDaySection />
								<CommitTimelineSection />
							</div>

							{/* PR 섹션 - 오렌지 계열 배경 */}
							<div className="bg-gradient-to-br from-orange-950 via-amber-950 to-orange-950">
								<ContributedPullRequestsSection />
								<PullRequestActivitySection />
							</div>

							{/* 이슈 섹션 - 그린 계열 배경 */}
							<div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-950">
								<ContributedIssuesSection />
								<IssueActivitySection />
							</div>

							{/* 멘션 섹션들 - 퍼플 계열 배경 */}
							<div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950">
								<MentionsSection />
							</div>

							{/* 성장 섹션 - 그레이 계열 배경 */}
							<div className="bg-gradient-to-br from-slate-950 via-gray-900 to-zinc-950">
								<GrowthSection />
							</div>

							{/* 엔딩 섹션 - 핑크 계열 배경 */}
							<div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
								<EndingSection />
							</div>
				</div>
			</YearProvider>
		</UserProvider>
	);
}
