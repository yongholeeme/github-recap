import type { User } from "@supabase/supabase-js";
import { useState } from "react";

interface HeroSectionProps {
	user: User;
	onLogout: () => void;
}

export default function HeroSection({ user, onLogout }: HeroSectionProps) {
	const userMetadata = user.user_metadata;
	const avatarUrl = userMetadata?.avatar_url || "";
	const name = userMetadata?.full_name || userMetadata?.user_name || user.email;
	const userName = userMetadata?.user_name || "";
	const currentYear = new Date().getFullYear();
	const [showAvatar, setShowAvatar] = useState(false);

	const handleLogout = () => {
		// Remove PAT from sessionStorage
		sessionStorage.removeItem('github_pat_token');
		onLogout();
	};

	return (
		<div className="h-screen snap-start flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden w-full">
			{/* Animated Background Layers */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-cyan-500/30 via-transparent to-transparent" />
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
				{/* Floating gradient orbs */}
				<div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto">
				{/* Logout Button - Top Right */}
				<div className="absolute top-4 right-4 sm:top-8 sm:right-8">
					<button
						type="button"
						onClick={handleLogout}
						className="px-4 py-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
					>
						로그아웃
					</button>
				</div>

				{/* Hero Content */}
				<div className="text-center space-y-8 sm:space-y-10 md:space-y-12 px-4">
					{/* Main Title */}
					<div className="space-y-6 sm:space-y-8">
						<div className="inline-block">
							<div className="text-6xl sm:text-7xl md:text-9xl animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
								🎉
							</div>
						</div>
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 drop-shadow-2xl tracking-tight leading-none">
								{currentYear}
							</h2>
							<h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl tracking-tight">
								GitHub Recap
							</h3>
						</div>
					</div>

					{/* Profile Info - Integrated */}
					<div className="flex flex-col items-center gap-4">
						<div className="flex items-center gap-3 sm:gap-4">
							{avatarUrl && (
								<img
									src={avatarUrl}
									alt={userName}
									onLoad={() => setShowAvatar(true)}
									onError={() => setShowAvatar(false)}
									className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-xl transition-opacity duration-300 ${showAvatar ? 'opacity-100' : 'opacity-0 absolute'}`}
								/>
							)}
							<div className="text-center">
								{userName && (
									<p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
										@{userName}
									</p>
								)}
								<p className="text-sm sm:text-base md:text-lg text-white/60">
									{name}
								</p>
							</div>
						</div>
					</div>

					{/* Description */}
					<div className="space-y-2 sm:space-y-3 max-w-3xl mx-auto">
						<p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 tracking-wide">
							당신의 한 해를 숫자로 돌아봅니다
						</p>
						<p className="text-base sm:text-lg md:text-xl text-white/70 font-medium">
							{currentYear}년, 당신은 코드로 무엇을 만들어냈나요?
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
