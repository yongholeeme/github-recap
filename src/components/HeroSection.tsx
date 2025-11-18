import { useState } from "react";
import { useYear } from '@/contexts/YearContext';
import type { User } from "@/types/user";

interface HeroSectionProps {
	user: User | null;
	onLogout: () => void;
}

export default function HeroSection({ user, onLogout }: HeroSectionProps) {
	const { year } = useYear();
	const avatarUrl = user?.avatar_url || "";
	const userName = user?.user_name || "";
	const [showAvatar, setShowAvatar] = useState(false);

	return (
		<div className="h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden w-full">
			{/* Dynamic gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
				{/* Animated gradient orbs */}
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
				<div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
				<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
				{/* Grid overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
			</div>

			{/* Top bar - Profile badge and logout */}
			{user && (
				<div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 flex items-center gap-3">
					{/* Profile badge */}
					{userName && (
						<div className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-full shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300 group">
							{avatarUrl && (
								<div className="relative">
									<img
										src={avatarUrl}
										alt={userName}
										onLoad={() => setShowAvatar(true)}
										onError={() => setShowAvatar(false)}
										className={`w-8 h-8 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 ${showAvatar ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'}`}
									/>
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-sm group-hover:blur-md transition-all duration-300" />
								</div>
							)}
							<span className="text-sm sm:text-base font-bold text-white/95 tracking-tight pr-1 group-hover:text-white transition-colors duration-300">
								@{userName}
							</span>
						</div>
					)}
					
					{/* Logout button */}
					<button
						type="button"
						onClick={onLogout}
						className="px-4 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-sm font-medium text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						로그아웃
					</button>
				</div>
			)}

			{/* Main content - Apple Event Style */}
			<div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
				{/* Main title - Gradient & Bold with Glow */}
				<h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-[-0.02em] mb-16 relative">
					{/* Glow layers */}
					<span className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" aria-hidden="true">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
							{year}
						</span>
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mt-2">
							GitHub Wrapped
						</span>
					</span>
					<span className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" aria-hidden="true">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
							{year}
						</span>
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mt-2">
							GitHub Wrapped
						</span>
					</span>
					
					{/* Main text */}
					<span className="relative block text-gray-200">
						{year}
					</span>
					<span className="relative block text-gray-200 mt-2">
						GitHub Wrapped
					</span>
				</h1>

				{/* Scroll CTA - Blue accent */}
				<div className="inline-flex flex-col items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors cursor-default">
					<span className="text-sm font-semibold">스크롤 또는 방향키로 확인하기</span>
					<div className="flex items-center gap-3 animate-bounce">
						<svg className="w-5 h-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
						</svg>
						<div className="flex gap-1.5">
							<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-blue-300">↑</kbd>
							<kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-blue-300 ">↓</kbd>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
