import type { User } from "@supabase/supabase-js";

interface HeroSectionProps {
	user: User;
	onLogout: () => void;
}

export default function HeroSection({ user, onLogout }: HeroSectionProps) {
	const userMetadata = user.user_metadata;
	const avatarUrl = userMetadata?.avatar_url || "";
	const name = userMetadata?.full_name || userMetadata?.user_name || user.email;
	const userName = userMetadata?.user_name || "";
	const bio = userMetadata?.bio || "";
	const currentYear = new Date().getFullYear();

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

			<div className="relative z-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
				{/* Profile Card */}
				<div className="group mx-auto w-fit">
					<div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl p-6 sm:p-8 md:p-10 transition-all hover:scale-105 hover:border-white/40 hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] shadow-2xl">
						{/* Gradient background effects */}
						<div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 blur-3xl transition-all group-hover:scale-150" />
						<div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-500/30 blur-3xl transition-all group-hover:scale-150" />

						<div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
							{avatarUrl && (
								<img
									src={avatarUrl}
									alt={userName}
									className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-white/40 shadow-2xl ring-4 sm:ring-8 ring-white/10 group-hover:ring-white/20 transition-all"
								/>
							)}
							<div className="flex-1 text-center sm:text-left">
								<h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3 drop-shadow-lg">
									{name}
								</h1>
								{userName && (
									<p className="text-base sm:text-lg md:text-xl text-white/80 font-semibold mb-2 sm:mb-3">
										@{userName}
									</p>
								)}
								{bio && (
									<p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
										{bio}
									</p>
								)}
							</div>
							<button
								type="button"
								onClick={handleLogout}
								className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-white/20"
							>
								로그아웃
							</button>
						</div>
					</div>
				</div>

				{/* Hero Title */}
				<div className="text-center space-y-6 sm:space-y-8 px-4">
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
