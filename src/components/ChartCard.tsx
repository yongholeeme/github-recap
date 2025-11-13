import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
} from "recharts";

interface ChartCardProps {
	title: string;
	description: string;
	data: Array<{ hour?: number; day?: string; count: number; month?: string }> | undefined;
	isLoading: boolean;
	isFetching: boolean;
	error: Error | null;
	onRefetch: () => void;
	dataKey: string;
}

export default function ChartCard({
	title,
	description,
	data,
	isLoading,
	isFetching,
	error,
	onRefetch,
	dataKey,
}: ChartCardProps) {
		const handleRefresh = () => {
			onRefetch();
		};

		return (
			<div
				className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300 col-span-full overflow-hidden backdrop-blur-sm ${
					isFetching ? "pointer-events-none" : ""
				}`}
			>
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