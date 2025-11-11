import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/oauth")({
	component: OAuthCallback,
});

function OAuthCallback() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleOAuthCallback = async () => {
			try {
				// Supabase automatically handles the OAuth callback
				const { error: authError } = await supabase.auth.getSession();

				if (authError) {
					throw authError;
				}

				// Redirect to home
				navigate({ to: "/" });
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to authenticate");
				setLoading(false);
			}
		};

		handleOAuthCallback();
	}, [navigate]);

	if (loading) {
		return (
			<div className="p-8 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
					<p className="text-gray-600">
						Please wait while we complete your login
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-8 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold mb-2 text-red-600">
						Authentication Error
					</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<button
						type="button"
						onClick={() => navigate({ to: "/" })}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Return Home
					</button>
				</div>
			</div>
		);
	}

	return null;
}
