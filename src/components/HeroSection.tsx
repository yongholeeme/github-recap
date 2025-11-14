import type { User } from "@supabase/supabase-js";
import { useState } from "react";

interface HeroSectionProps {
	user: User | null;
	onLogout: () => void;
}

export default function HeroSection({ user, onLogout }: HeroSectionProps) {
	const userMetadata = user?.user_metadata;
	const avatarUrl = userMetadata?.avatar_url || "";
	const userName = userMetadata?.user_name || "";
	const currentYear = new Date().getFullYear();
	const [showAvatar, setShowAvatar] = useState(false);

	const handleLogout = () => {
		// Remove PAT from sessionStorage
		sessionStorage.removeItem('github_pat_token');
		onLogout();
	};

	return (
		<div className="h-screen snap-start flex items-center justify-center p-4 sm:p-8 relative overflow-hidden w-full">
			{/* Dynamic gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
				{/* Animated gradient orbs */}
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
				<div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
				<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
				{/* Grid overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
			</div>

			{/* Logout button */}
			{user&& <button
				type="button"
				onClick={handleLogout}
				className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 px-4 py-2 text-white/50 hover:text-white/80 text-sm transition-colors"
			>
				로그아웃
			</button>}

			{/* Main content - Apple Event Style */}
			<div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
				{/* Main title - Gradient & Bold */}
				<h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-[-0.02em] mb-16">
					<span className="block text-gray-200">
						{currentYear}
					</span>
					<span className="block text-gray-200 mt-2">
						GitHub Wrapped
					</span>
				</h1>

				{/* Profile badge - Minimal */}
				{userName && (
					<div className="inline-flex items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg mb-20">
						{avatarUrl && (
							<img
								src={avatarUrl}
								alt={userName}
								onLoad={() => setShowAvatar(true)}
								onError={() => setShowAvatar(false)}
								className={`w-7 h-7 rounded-full transition-all duration-300 ${showAvatar ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'}`}
							/>
						)}
						<span className="text-base sm:text-lg font-semibold text-white/90 tracking-tight">
							@{userName}
						</span>
					</div>
				)}

				{/* Scroll CTA - Blue accent */}
				<div className="inline-flex flex-col items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-default">
					<span className="text-sm font-semibold">스크롤하여 확인하기</span>
					<svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>
	);
}
