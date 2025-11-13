export default function EndingSection() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden w-full">
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />

			<div className="relative z-10 text-center w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 px-4">
				<div className="space-y-6 sm:space-y-8">
					<div className="space-y-4 sm:space-y-6">
						<h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 tracking-tight leading-none drop-shadow-2xl">
							{currentYear}년
						</h3>
						<h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl">
							수고하셨습니다
						</h4>
					</div>
				</div>

				<div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto">
					<p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-bold leading-relaxed">
						한 줄의 코드, 하나의 커밋이 모여
						<br />
						멋진 한 해를 만들어냈습니다
					</p>
					<p className="text-lg sm:text-xl md:text-2xl text-white/70 font-medium">
						내년에는 더 멋진 이야기를 함께 써내려가요! 🚀
					</p>
				</div>

				{/* Credit */}
				<div className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg">
					<span className="text-sm sm:text-base text-white/70 font-medium">
						Made with
					</span>
					<span className="text-lg text-red-400">❤️</span>
					<span className="text-sm sm:text-base text-white/70 font-medium">
						by
					</span>
					<a 
						href="https://github.com/yongholeeme" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-sm sm:text-base text-white/90 font-semibold hover:text-white transition-colors"
					>
						@yongholeeme
					</a>
				</div>
			</div>
		</div>
	);
}
