import type { User } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
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
import { config } from "@/../config";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [patToken, setPATToken] = useState('');
	const [patError, setPATError] = useState('');

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

	const handlePATLogin = async () => {
		setPATError('');
		
		if (!patToken.trim()) {
			setPATError('토큰을 입력해주세요');
			return;
		}

		// Validate PAT by making a test request
		try {
			const { Octokit } = await import('octokit');
			const octokit = new Octokit({ auth: patToken, baseUrl: config.github.baseUrl });
			const { data: githubUser } = await octokit.rest.users.getAuthenticated();
			
			// Clear previous user's cache
			queryClient.clear();
			localStorage.removeItem('github-recap-cache');
			
			// Valid token, save it (sessionStorage for better security)
			sessionStorage.setItem('github_pat_token', patToken);
			
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
			setPATError('유효하지 않은 토큰입니다');
			console.error('PAT validation error:', error);
		}
	};

	const handleLogout = () => {
		// Clear all React Query cache
		queryClient.clear();
		// Clear localStorage cache
		localStorage.removeItem('github-recap-cache');
		// Reset user state
		setUser(null);
	};

	if (isLoading) {
		return (
				<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
					<HeroSection user={null} onLogout={handleLogout} />
				</div>
		);
	}

	if (user) {
		return (
			<>
				<RefreshButton />
				<ClearDataButton />
				<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
					<HeroSection user={user} onLogout={handleLogout} />
					<CommitActivitySection />
					<CommitsByHourSection />
					<CommitsByDaySection />
					<CommitTimelineSection />
					<IssueActivitySection />
					<PullRequestActivitySection />
					<MentionsSection />
					<GrowthSection />
					<EndingSection />
				</div>
			</>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-8">
			<div className="relative max-w-md w-full">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
				<div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-12 shadow-2xl">
					<div className="text-center mb-8">
						<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							GitHub 회고
						</h1>
						<p className="text-gray-600 text-lg">
							Personal Access Token으로<br />올해의 활동을 확인하세요
						</p>
					</div>

					<div className="space-y-4">
						<div>
							<label htmlFor="pat" className="block text-sm font-medium text-gray-700 mb-2">
								GitHub Personal Access Token
							</label>
							<input
								id="pat"
								type="password"
								value={patToken}
								onChange={(e) => setPATToken(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handlePATLogin();
									}
								}}
								placeholder="ghp_xxxxxxxxxxxx"
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
							/>
							{patError && (
								<p className="mt-2 text-sm text-red-600">{patError}</p>
							)}
							<p className="mt-2 text-xs text-gray-500">
								<a 
									href="https://github.com/settings/tokens/new?scopes=repo,read:user" 
									target="_blank" 
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									토큰 생성하기
								</a>
								{' '}(필요한 권한: repo, read:user)
							</p>
						</div>

						<button
							type="button"
							onClick={handlePATLogin}
							className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							계속하기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
