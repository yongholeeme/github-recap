import { useState } from 'react';
import { config } from '@/../config';
import { PAT_STORAGE_KEY } from '@/constants/storage';
import type { User } from '@/types/user';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLogin: (user: User) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
	const [patToken, setPATToken] = useState('');
	const [patError, setPATError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	if (!isOpen) return null;

	const handlePATLogin = async () => {
		setPATError('');
		
		if (!patToken.trim()) {
			setPATError('토큰을 입력해주세요');
			return;
		}

		setIsLoading(true);

		// Validate PAT by making a test request
		try {
			const { Octokit } = await import('octokit');
			const octokit = new Octokit({ auth: patToken, baseUrl: config.github.baseUrl });
			const { data } = await octokit.rest.users.getAuthenticated();
			
			// Valid token, save it (sessionStorage for better security)
			localStorage.clear()
			sessionStorage.setItem(PAT_STORAGE_KEY, patToken);
			
			// Use avatar_url from API response (handles redirects properly)

			onLogin({
				avatar_url: data.avatar_url,
				user_name: data.login,
			});
			onClose();
		} catch (error) {
			setPATError('유효하지 않은 토큰입니다');
			console.error('PAT validation error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="relative max-w-md w-full">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-20" />
				<div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="text-center mb-6">
						<h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							로그인
						</h2>
						<p className="text-gray-600 text-sm">
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
								disabled={isLoading}
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
							disabled={isLoading}
							className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? '확인 중...' : '계속하기'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
