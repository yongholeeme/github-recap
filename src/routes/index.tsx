import type { User } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import {
	getCommitsCount,
	getIssuesCount,
	getIssueCommentsCount,
	getPullRequestsCount,
	getPullRequestReviewsCount,
	getClosedIssuesCount,
	getCreatedReposCount,
	getTotalStarsReceived,
	getTotalForksReceived,
	getPullRequestReviewCommentsCount,
	getMergedPullRequestsCount,
	getContributedReposCount,
	getApprovedPullRequestsCount,
	getRequestedChangesPullRequestsCount,
	getMentionsCount,
	getLongestCommitMessage,
	getShortestCommitMessage,
	getAverageCommitMessageLength,
	getLatestCommitHour,
	getMostActiveHour,
	getActiveDaysCount,
	getLongestStreak,
	getPullRequestDiscussionsCount,
	getCommitsByHour,
	getCommitsByDayOfWeek,
} from "../lib/github";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/")({
	component: Index,
});

interface StatCardProps {
	title: string;
	description: string;
	queryKey: string[];
	queryFn: () => Promise<number>;
	enabled: boolean;
	requiresManualFetch?: boolean;
	isClickable?: boolean;
	onClick?: () => void;
}

interface CommitMessageCardProps {
	title: string;
	description: string;
	queryKey: string[];
	queryFn: () => Promise<{ message: string; length: number; repository: string; url: string }>;
	enabled: boolean;
	onShowMessage: (data: { message: string; repository: string; url: string }) => void;
}

function CommitMessageCard({ title, description, queryKey, queryFn, enabled, onShowMessage }: CommitMessageCardProps) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey,
		queryFn,
		enabled,
		staleTime: 1000 * 60 * 10,
		retry: 2,
	});

	const handleRefresh = (e: React.MouseEvent) => {
		e.stopPropagation();
		refetch();
	};

	return (
		<div 
			className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${data && data.message ? 'cursor-pointer' : ''} ${isFetching ? 'pointer-events-none' : ''}`}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl group-hover:from-blue-400/30 group-hover:to-cyan-400/30 transition-all duration-500" />
			<div className={`relative flex flex-col min-h-[100px] sm:min-h-[120px] justify-between ${isFetching ? 'opacity-40' : ''}`}
				onClick={data && data.message && !isFetching ? () => onShowMessage({ message: data.message, repository: data.repository, url: data.url }) : undefined}
			>
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">{title}</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">{description}</p>
					</div>
					<button
						type="button"
						onClick={handleRefresh}
						disabled={isFetching}
						className="flex-shrink-0 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
						title="새로고침"
					>
						<svg className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</button>
				</div>
				<div className="mt-auto">
					{isLoading && !data && (
						<div className="flex items-center gap-2">
							<div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
							<p className="text-xs text-gray-400">로딩 중...</p>
						</div>
					)}
					{error && !data && (
						<p className="text-sm text-red-500 font-semibold">오류 발생</p>
					)}
					{error && data && (
						<>
							<div className="flex items-center gap-1 mb-2">
								<svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="text-xs text-red-500">새로고침 실패</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{data.length.toLocaleString()}
								</p>
								{data.message && (
									<span className="text-xs text-gray-400">클릭하여 보기</span>
								)}
							</div>
						</>
					)}
					{!error && data && data.length !== undefined && (
						<div className="flex items-center justify-between">
							<p className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
								{data.length.toLocaleString()}
							</p>
							{data.message && (
								<span className="text-xs text-gray-400 group-hover:text-purple-600 transition-colors">✨ 보기</span>
							)}
						</div>
					)}
					{!error && data && data.length === 0 && (
						<p className="text-sm text-gray-400">데이터 없음</p>
					)}
				</div>
			</div>
		</div>
	);
}

function StatCard({ title, description, queryKey, queryFn, enabled, requiresManualFetch, isClickable, onClick }: StatCardProps) {
	const [shouldFetch, setShouldFetch] = useState(!requiresManualFetch);
	
	const { data: value, isLoading, isFetching, error, refetch } = useQuery({
		queryKey,
		queryFn,
		enabled: enabled && shouldFetch,
		staleTime: 1000 * 60 * 10,
		retry: 2,
	});

	const handleFetch = () => {
		setShouldFetch(true);
		refetch();
	};

	const handleRefresh = (e: React.MouseEvent) => {
		e.stopPropagation();
		refetch();
	};

	return (
		<div 
			className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${isClickable ? 'cursor-pointer' : ''} ${isFetching ? 'pointer-events-none' : ''}`}
		>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-2xl group-hover:from-pink-400/30 group-hover:to-orange-400/30 transition-all duration-500" />
			<div className={`relative flex flex-col min-h-[100px] sm:min-h-[120px] justify-between ${isFetching ? 'opacity-40' : ''}`}
				onClick={isClickable && value !== undefined && !isFetching ? onClick : undefined}
			>
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<h3 className="text-xs sm:text-sm font-bold text-white mb-1">{title}</h3>
						<p className="text-[10px] sm:text-xs text-white/60 mb-2">{description}</p>
					</div>
					{shouldFetch && (
						<button
							type="button"
							onClick={handleRefresh}
							disabled={isFetching}
							className="flex-shrink-0 p-1.5 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
							title="새로고침"
						>
							<svg className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
						</button>
					)}
				</div>
				<div className="mt-auto">
					{requiresManualFetch && !shouldFetch ? (
						<>
							<p className="text-2xl font-bold text-gray-300 mb-2">—</p>
							<button
								type="button"
								onClick={handleFetch}
								className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
							>
								불러오기
							</button>
						</>
					) : (
						<>
							{error && value === undefined && (
								<p className="text-sm text-red-400 font-semibold">오류 발생</p>
							)}
							{error && value !== undefined && (
								<>
									<div className="flex items-center gap-1 mb-2">
										<svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p className="text-xs text-red-400">새로고침 실패</p>
									</div>
									<div className="flex items-center gap-2">
										<p className="text-3xl font-bold text-white drop-shadow-lg">
											{value.toLocaleString()}
										</p>
										{isClickable && (
											<span className="text-xs text-white/60">클릭하여 보기</span>
										)}
									</div>
								</>
							)}
							{!error && value !== undefined && (
								<div className="flex items-center gap-2">
									<p className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
										{value.toLocaleString()}
									</p>
									{isClickable && (
										<span className="text-[10px] sm:text-xs text-white/60">클릭하여 보기</span>
									)}
								</div>
							)}
							{!error && isLoading && value === undefined && (
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
									<p className="text-xs text-white/60">로딩 중...</p>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}



interface ChartCardProps {
	title: string;
	description: string;
	queryKey: string[];
	queryFn: () => Promise<Array<{ hour?: number; day?: string; count: number }>>;
	enabled: boolean;
	dataKey: string;
}

function ChartCard({ title, description, queryKey, queryFn, enabled, dataKey }: ChartCardProps) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey,
		queryFn,
		enabled,
		staleTime: 1000 * 60 * 10,
		retry: 2,
	});

	const handleRefresh = () => {
		refetch();
	};

	return (
		<div className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300 col-span-full overflow-hidden backdrop-blur-sm ${isFetching ? 'pointer-events-none' : ''}`}>
			{isFetching && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10" />
			)}
			<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl" />
			<div className={`relative ${isFetching ? 'opacity-40' : ''}`}>
				<div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
					<div className="flex-1">
						<h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{title}</h3>
						<p className="text-xs sm:text-sm text-white/60">{description}</p>
					</div>
					<button
						type="button"
						onClick={handleRefresh}
						disabled={isFetching}
						className="flex-shrink-0 p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
						title="새로고침"
					>
						<svg className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</button>
				</div>
				{isLoading && !data && (
					<div className="flex items-center gap-2">
						<div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
						<p className="text-sm text-white/60">로딩 중...</p>
					</div>
				)}
				{error && !data && (
					<p className="text-sm text-red-400 font-semibold">오류 발생</p>
				)}
				{error && data && (
					<>
						<div className="flex items-center gap-1 mb-4">
							<svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p className="text-sm text-red-400">새로고침 실패</p>
						</div>
						<div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={data}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
										<XAxis 
											dataKey={dataKey} 
											stroke="#6b7280"
										/>
										<YAxis 
											label={{ value: "커밋 수", angle: -90, position: "insideLeft" }}
											stroke="#6b7280"
										/>
										<Tooltip 
											contentStyle={{
												backgroundColor: 'rgba(255, 255, 255, 0.95)',
												border: '1px solid #e5e7eb',
												borderRadius: '8px',
												boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
											}}
											cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
										/>
										<Bar 
											dataKey="count" 
											fill="url(#colorGradient)"
											radius={[8, 8, 0, 0]}
										/>
										<defs>
											<linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
												<stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
												<stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
											</linearGradient>
										</defs>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</>
				)}
				{!error && data && (
					<div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={data}>
									<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
									<XAxis 
										dataKey={dataKey} 
										stroke="#6b7280"
									/>
									<YAxis 
										label={{ value: "커밋 수", angle: -90, position: "insideLeft" }}
										stroke="#6b7280"
									/>
									<Tooltip 
										formatter={(value: number) => [`${value}개`, "커밋"]}
										labelFormatter={(label) => dataKey === "hour" ? `${label}시` : `${label}요일`}
										contentStyle={{
											backgroundColor: 'rgba(255, 255, 255, 0.95)',
											border: '1px solid #e5e7eb',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
										}}
									/>
									<Bar 
										dataKey="count" 
										fill="url(#colorGradient)" 
										radius={[8, 8, 0, 0]}
									/>
									<defs>
										<linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
											<stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
										</linearGradient>
									</defs>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

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

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setUser(null);
	};

	if (isLoading) {
		return (
			<div className="p-8">
				<p>로딩 중...</p>
			</div>
		);
	}

	if (user) {
		const userMetadata = user.user_metadata;
		const avatarUrl = userMetadata?.avatar_url || "";
		const name =
			userMetadata?.full_name || userMetadata?.user_name || user.email;
		const userName = userMetadata?.user_name || "";
		const bio = userMetadata?.bio || "";
		const currentYear = new Date().getFullYear();

		return (
			<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
				<div className="max-w-7xl mx-auto">
					{/* Hero + Profile Section */}
					<div className="h-screen snap-start flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden">
						{/* Animated Background Layers */}
						<div className="absolute inset-0">
							<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_var(--tw-gradient-stops))] from-cyan-500/30 via-transparent to-transparent" />
							<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
							{/* Floating gradient orbs */}
							<div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
							<div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
						</div>

						<div className="relative z-10 w-full max-w-5xl space-y-8 sm:space-y-12 md:space-y-16">
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
												<p className="text-base sm:text-lg md:text-xl text-white/80 font-semibold mb-2 sm:mb-3">@{userName}</p>
											)}
											{bio && (
												<p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">{bio}</p>
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
									<div className="text-6xl sm:text-7xl md:text-9xl animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">🎉</div>
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

					{/* 💻 커밋 활동 */}
					<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						{/* Section Background */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 w-full max-w-7xl space-y-8 sm:space-y-10 md:space-y-12">
							{/* Section Header */}
							<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
								<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl">
									<span className="text-3xl sm:text-4xl md:text-5xl">💻</span>
								</div>
								<div>
									<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">커밋의 기록</h3>
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">매일매일, 한 줄 한 줄 쌓아온 당신의 흔적</p>
								</div>
							</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
							<StatCard
								title="총 커밋"
								description="올해 작성한 커밋"
								queryKey={['github-commits', user?.id]}
								queryFn={() => getCommitsCount()}
								enabled={!!user}
							/>
						<CommitMessageCard
							title="가장 긴 커밋"
							description="가장 긴 커밋 메시지 길이"
							queryKey={['github-longest-commit-message', user?.id]}
							queryFn={() => getLongestCommitMessage()}
							enabled={!!user}
							onShowMessage={(data) => {
								window.open(data.url, '_blank');
							}}
						/>
						<CommitMessageCard
							title="가장 짧은 커밋"
							description="가장 짧은 커밋 메시지 길이"
							queryKey={['github-shortest-commit-message', user?.id]}
							queryFn={() => getShortestCommitMessage()}
							enabled={!!user}
							onShowMessage={(data) => {
								window.open(data.url, '_blank');
							}}
						/>
						<StatCard
							title="평균 커밋 메시지 길이"
							description="커밋 메시지 평균 글자 수"
							queryKey={['github-average-commit-message', user?.id]}
							queryFn={() => getAverageCommitMessageLength()}
							enabled={!!user}
						/>
						<StatCard
							title="최근 커밋 시간"
							description="가장 최근 커밋한 시간 (24시간 기준)"
							queryKey={['github-latest-commit-hour', user?.id]}
							queryFn={() => getLatestCommitHour()}
							enabled={!!user}
						/>
							<StatCard
								title="활동한 날"
								description="기여한 날짜 수"
								queryKey={['github-active-days', user?.id]}
								queryFn={() => getActiveDaysCount()}
								enabled={!!user}
							/>
							<StatCard
								title="최장 연속 기여"
								description="연속으로 기여한 최대 일수"
								queryKey={['github-longest-streak', user?.id]}
								queryFn={() => getLongestStreak()}
								enabled={!!user}
							/>
							<StatCard
								title="최근 커밋 시간"
								description="가장 최근 커밋 시간대"
								queryKey={['github-latest-commit-hour', user?.id]}
								queryFn={() => getLatestCommitHour()}
								enabled={!!user}
							/>
							<StatCard
								title="가장 활발한 시간"
								description="커밋이 가장 많은 시간대"
								queryKey={['github-most-active-hour', user?.id]}
								queryFn={() => getMostActiveHour()}
								enabled={!!user}
							/>
							</div>
						</div>
					</div>

					{/* 📊 커밋 패턴 분석 */}
					<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-pink-950 to-rose-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 w-full max-w-7xl space-y-8 sm:space-y-10 md:space-y-12">
							<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
								<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600 rounded-2xl sm:rounded-3xl shadow-2xl">
									<span className="text-3xl sm:text-4xl md:text-5xl">📊</span>
								</div>
								<div>
									<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">당신의 코딩 타임</h3>
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">언제 가장 열정적이었나요?</p>
								</div>
							</div>
						<div className="grid grid-cols-1 gap-3 sm:gap-4">
							<ChartCard
								title="시간대별 커밋 분포"
								description="24시간 동안 시간대별 커밋 활동"
								queryKey={['github-commits-by-hour', user?.id]}
								queryFn={() => getCommitsByHour()}
								enabled={!!user}
								dataKey="hour"
							/>
							<ChartCard
								title="요일별 커밋 분포"
								description="일주일 동안 요일별 커밋 활동"
								queryKey={['github-commits-by-day', user?.id]}
								queryFn={() => getCommitsByDayOfWeek()}
								enabled={!!user}
								dataKey="day"
							/>
							</div>
						</div>
					</div>

					{/* 🎯 이슈 활동 */}
					<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 w-full max-w-7xl space-y-8 sm:space-y-10 md:space-y-12">
							<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
								<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl shadow-2xl">
									<span className="text-3xl sm:text-4xl md:text-5xl">🎯</span>
								</div>
								<div>
									<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">문제 해결사</h3>
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">이슈로 시작해, 해결로 끝나는 당신의 여정</p>
								</div>
							</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
							<StatCard
								title="생성한 이슈"
								description="작성한 이슈"
								queryKey={['github-issues', user?.id]}
								queryFn={() => getIssuesCount()}
								enabled={!!user}
							/>
							<StatCard
								title="닫은 이슈"
								description="해결한 이슈"
								queryKey={['github-closed-issues', user?.id]}
								queryFn={() => getClosedIssuesCount()}
								enabled={!!user}
							/>
							<StatCard
								title="이슈 댓글"
								description="이슈 토론 참여"
								queryKey={['github-issue-comments', user?.id]}
								queryFn={() => getIssueCommentsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="멘션"
								description="멘션된 횟수"
								queryKey={['github-mentions', user?.id]}
								queryFn={() => getMentionsCount()}
								enabled={!!user}
							/>
							</div>
						</div>
					</div>

					{/* 🔀 Pull Request 활동 */}
					<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-pink-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 w-full max-w-7xl space-y-8 sm:space-y-10 md:space-y-12">
							<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
								<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl">
									<span className="text-3xl sm:text-4xl md:text-5xl">🔀</span>
								</div>
								<div>
									<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">코드 리뷰어</h3>
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">함께 만들어가는 더 나은 코드</p>
								</div>
							</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
							<StatCard
								title="생성한 PR"
								description="작성한 풀 리퀘스트"
								queryKey={['github-pull-requests', user?.id]}
								queryFn={() => getPullRequestsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="머지된 PR"
								description="병합 완료"
								queryKey={['github-merged-prs', user?.id]}
								queryFn={() => getMergedPullRequestsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="PR 리뷰"
								description="리뷰한 PR"
								queryKey={['github-pr-reviews', user?.id]}
								queryFn={() => getPullRequestReviewsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="리뷰 댓글"
								description="코드 리뷰 댓글"
								queryKey={['github-pr-review-comments', user?.id]}
								queryFn={() => getPullRequestReviewCommentsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="승인한 PR"
								description="Approve"
								queryKey={['github-approved-prs', user?.id]}
								queryFn={() => getApprovedPullRequestsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="변경 요청"
								description="Request Changes"
								queryKey={['github-requested-changes', user?.id]}
								queryFn={() => getRequestedChangesPullRequestsCount()}
								enabled={!!user}
							/>
							<StatCard
								title="PR 토론"
								description="토론 참여"
								queryKey={['github-pr-discussions', user?.id]}
								queryFn={() => getPullRequestDiscussionsCount()}
								enabled={!!user}
							/>
							</div>
						</div>
					</div>

					{/* 📦 저장소 활동 */}
					<div className="min-h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-blue-950 to-indigo-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 w-full max-w-7xl space-y-8 sm:space-y-10 md:space-y-12">
							<div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
								<div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl">
									<span className="text-3xl sm:text-4xl md:text-5xl">📦</span>
								</div>
								<div>
									<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 md:mb-4 tracking-tight drop-shadow-xl">프로젝트 빌더</h3>
									<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-medium px-4">세상에 공유한 당신의 창작물</p>
								</div>
							</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
							<StatCard
								title="생성한 저장소"
								description="올해 생성한 저장소"
								queryKey={['github-created-repos', user?.id]}
								queryFn={() => getCreatedReposCount()}
								enabled={!!user}
							/>
							<StatCard
								title="기여한 외부 저장소"
								description="다른 저장소 기여"
								queryKey={['github-contributed-repos', user?.id]}
								queryFn={() => getContributedReposCount()}
								enabled={!!user}
							/>
							<StatCard
								title="받은 스타"
								description="모든 저장소의 스타"
								queryKey={['github-total-stars', user?.id]}
								queryFn={() => getTotalStarsReceived()}
								enabled={!!user}
							/>
							<StatCard
								title="받은 포크"
								description="모든 저장소의 포크"
								queryKey={['github-total-forks', user?.id]}
								queryFn={() => getTotalForksReceived()}
								enabled={!!user}
							/>
							</div>
						</div>
					</div>

					{/* 🌟 Ending Section */}
					<div className="h-screen snap-start flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent" />
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
						
						<div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 px-4">
							<div className="space-y-6 sm:space-y-8">
								<div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-2xl">✨</div>
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
									한 줄의 코드, 하나의 커밋이 모여<br />
									멋진 한 해를 만들어냈습니다
								</p>
								<p className="text-lg sm:text-xl md:text-2xl text-white/70 font-medium">
									내년에는 더 멋진 이야기를 함께 써내려가요! 🚀
								</p>
							</div>

							<div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/20">
								<div className="flex items-center justify-center gap-2 sm:gap-3 text-white/60 text-sm sm:text-base md:text-lg">
									<span>Made with</span>
									<span className="text-xl sm:text-2xl text-red-400 animate-pulse">❤️</span>
									<span>by yongholeeme</span>
								</div>
							</div>
						</div>
					</div>
				</div>
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
