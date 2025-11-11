import type { User } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';
import HeroSection from '@/components/HeroSection';
import CommitActivitySection from '@/components/CommitActivitySection';
import CommitPatternsSection from '@/components/CommitPatternsSection';
import IssueActivitySection from '@/components/IssueActivitySection';
import PullRequestActivitySection from '@/components/PullRequestActivitySection';
import LanguagesSection from '@/components/LanguagesSection';
import GrowthSection from '@/components/GrowthSection';
import EndingSection from '@/components/EndingSection';

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check for existing session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);



	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${window.location.origin}/oauth`,
			},
		});
	};

	if (isLoading) {
		return (
			<div className="p-8">
				<p>로딩 중...</p>
			</div>
		);
	}

	if (user) {
		return (
			<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
				<HeroSection user={user} onLogout={() => setUser(null)} />
				<CommitActivitySection />
				<CommitPatternsSection />
				<IssueActivitySection />
				<PullRequestActivitySection />
				<LanguagesSection />
				<GrowthSection />
				<EndingSection />
			</div>
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
							GitHub 계정을 연결하여<br />올해의 활동을 확인하세요
						</p>
					</div>
					<button
						type="button"
						onClick={handleLogin}
						className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
					>
						<svg
							className="w-6 h-6 group-hover:scale-110 transition-transform"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>GitHub Logo</title>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						GitHub로 로그인
					</button>
				</div>
			</div>
		</div>
	);
}
