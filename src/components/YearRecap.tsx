import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { queryClient } from '@/main';
import '@/lib/github/rateLimit'; // Auto-logs rate limit
import HeroSection from '@/components/HeroSection';
import CommitActivitySection from '@/components/CommitActivitySection';
import CommitsByHourSection from '@/components/CommitsByHourSection';
import CommitsByDaySection from '@/components/CommitsByDaySection';
import CommitTimelineSection from '@/components/CommitTimelineSection';
import IssueActivitySection from '@/components/IssueActivitySection';
import PullRequestActivitySection from '@/components/PullRequestActivitySection';
import MentionsSection from '@/components/MentionsSection';
import GrowthSection from '@/components/GrowthSection';
import EndingSection from '@/components/EndingSection';
import RefreshButton from '@/components/RefreshButton';
import ClearDataButton from '@/components/ClearDataButton';
import LoginModal from '@/components/LoginModal';
import LoginToast from '@/components/LoginToast';
import { YearProvider } from '@/contexts/YearContext';
import { config } from "@/../config";

interface YearRecapProps {
	year?: number;
}

export default function YearRecap({ year }: YearRecapProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	// Default to current year if not specified
	const targetYear = year || new Date().getFullYear();
	
	// TODO: Use targetYear to filter data in the future

	useEffect(() => {
		// Check for PAT in sessionStorage
		const pat = sessionStorage.getItem('github_pat_token');
		if (pat) {
			// Fetch user info with PAT
			const fetchPATUser = async () => {
				try {
					const { Octokit } = await import('octokit');
					const octokit = new Octokit({ auth: pat, baseUrl: config.github.baseUrl });
					const { data: githubUser } = await octokit.rest.users.getAuthenticated();
					
					// Create a pseudo User object with GitHub data
					// Use avatar_url from API response (handles redirects properly)
					setUser({
						id: 'pat-user',
						app_metadata: {},
						aud: 'authenticated',
						created_at: new Date().toISOString(),
						user_metadata: {
							avatar_url: githubUser.avatar_url,
							full_name: githubUser.name,
							user_name: githubUser.login,
							bio: githubUser.bio,
						},
					} as User);
				} catch (error) {
					console.error('Failed to fetch PAT user:', error);
					// Invalid PAT, remove it and clear cache
					sessionStorage.removeItem('github_pat_token');
					queryClient.clear();
					localStorage.removeItem('github-recap-cache');
					setUser(null);
				} finally {
					setIsLoading(false);
				}
			};
			fetchPATUser();
			return;
		}

		setIsLoading(false);
	}, []);

	const handleLogin = (newUser: User) => {
		// Clear previous user's cache
		queryClient.clear();
		localStorage.removeItem('github-recap-cache');
		setUser(newUser);
	};

	const handleLogout = () => {
		// Clear all React Query cache
		queryClient.clear();
		// Clear localStorage cache
		localStorage.removeItem('github-recap-cache');
		// Clear session token
		sessionStorage.removeItem('github_pat_token');
		// Reset user state
		setUser(null);
	};

	return (
		<YearProvider year={targetYear}>
			{user && (
				<>
					<RefreshButton />
					<ClearDataButton />
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

			<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
				<HeroSection user={user} onLogout={handleLogout} />
				{user && (
					<>
						<CommitActivitySection />
						<CommitsByHourSection />
						<CommitsByDaySection />
						<CommitTimelineSection />
						<IssueActivitySection />
						<PullRequestActivitySection />
						<MentionsSection />
						<GrowthSection />
						<EndingSection />
					</>
				)}
			</div>
		</YearProvider>
	);
}
