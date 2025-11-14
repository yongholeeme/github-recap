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
	dataKey: string;
}

export default function ChartCard({
	title,
	description,
	data,
	isFetching,
	error,
	dataKey,
}: ChartCardProps) {
	return (
		<div
			className={`group relative col-span-full overflow-hidden ${
				isFetching ? "pointer-events-none" : ""
			}`}
		>
			{/* Apple-style minimal card */}
			<div className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20">
				{/* Shimmer effect when fetching */}
				{isFetching && (
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] z-10" />
				)}

				{/* Content wrapper */}
				<div className={`relative transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
					{/* Header */}
					<div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
						<h3 className="text-xl sm:text-2xl font-black text-gray-200 mb-2 tracking-tight">
							{title}
						</h3>
						<p className="text-sm sm:text-base text-white/50 font-medium">
							{description}
						</p>
					</div>

					{/* Chart container */}
					<div className="px-6 sm:px-8 pb-6 sm:pb-8">
						{error && !data && (
							<div className="flex items-center justify-center h-64 rounded-xl bg-red-500/5 border border-red-500/20">
								<p className="text-sm text-red-400 font-medium">데이터를 불러올 수 없습니다</p>
							</div>
						)}
						
						{data && (
							<div className="relative">
								{error && (
									<div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/20">
										<svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p className="text-xs text-red-400 font-medium">업데이트 실패</p>
									</div>
								)}
								
								<div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 sm:p-6">
									<div className="h-64 sm:h-72">
										<ResponsiveContainer width="100%" height="100%">
											<BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
												<CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
												<XAxis 
													dataKey={dataKey} 
													stroke="rgba(255, 255, 255, 0.3)"
													tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
													tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
													axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
												/>
												<YAxis 
													stroke="rgba(255, 255, 255, 0.3)"
													tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
													tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
													axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
													allowDecimals={false}
												/>
												<Tooltip 
													formatter={(value: number) => [`${value}개`, "커밋"]}
													labelFormatter={(label) => dataKey === "hour" ? `${label}시` : dataKey === "day" ? `${label}요일` : label}
													contentStyle={{
														backgroundColor: 'rgba(0, 0, 0, 0.9)',
														border: '1px solid rgba(255, 255, 255, 0.1)',
														borderRadius: '12px',
														boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
														backdropFilter: 'blur(20px)',
														padding: '12px 16px',
													}}
													labelStyle={{
														color: 'rgba(255, 255, 255, 0.9)',
														fontSize: '13px',
														fontWeight: '600',
														marginBottom: '4px',
													}}
													itemStyle={{
														color: 'rgba(255, 255, 255, 0.7)',
														fontSize: '12px',
													}}
													cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
												/>
												<Bar 
													dataKey="count" 
													fill="url(#appleGradient)" 
													radius={[6, 6, 0, 0]}
													maxBarSize={60}
												/>
												<defs>
													<linearGradient id="appleGradient" x1="0" y1="0" x2="0" y2="1">
														<stop offset="0%" stopColor="#f0abfc" stopOpacity={0.9} />
														<stop offset="50%" stopColor="#e879f9" stopOpacity={0.8} />
														<stop offset="100%" stopColor="#d946ef" stopOpacity={0.7} />
													</linearGradient>
												</defs>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}