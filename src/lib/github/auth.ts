import { Octokit } from "octokit";
import { supabase } from "@/lib/supabase";
import { config } from "@/../config";

// PAT token storage key
const PAT_STORAGE_KEY = "github_pat_token";

export function savePAT(token: string): void {
  // Use sessionStorage for better security - token is cleared when tab closes
  sessionStorage.setItem(PAT_STORAGE_KEY, token);
}

export function getPAT(): string | null {
  return sessionStorage.getItem(PAT_STORAGE_KEY);
}

export function removePAT(): void {
  sessionStorage.removeItem(PAT_STORAGE_KEY);
}

export function hasPAT(): boolean {
  return !!getPAT();
}

export async function getOctokit(): Promise<Octokit> {
  // First, try PAT
  const pat = getPAT();
  if (pat) {
    console.log({
      auth: pat,
      baseUrl: config.github.baseUrl,
    });
    return new Octokit({
      auth: pat,
      baseUrl: config.github.baseUrl,
    });
  }

  throw new Error("@_@!!!");

  // Fallback to OAuth
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.provider_token;
  if (!token) {
    throw new Error("GitHub 액세스 토큰이 없습니다. 다시 로그인해주세요.");
  }

  return new Octokit({
    auth: token,
    baseUrl: config.github.baseUrl,
  });
}

export function getAuthType(): "PAT" | "OAuth" | null {
  if (getPAT()) return "PAT";
  // We could check for session here, but it's async
  return "OAuth";
}

export async function getRateLimit(): Promise<{
  limit: number;
  remaining: number;
  used: number;
  reset: Date;
  percentage: number;
}> {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.rateLimit.get();

  const core = data.resources.core;
  const percentage = (core.remaining / core.limit) * 100;

  return {
    limit: core.limit,
    remaining: core.remaining,
    used: core.used,
    reset: new Date(core.reset * 1000),
    percentage,
  };
}

let cachedUsername: string | null = null;
let usernamePromise: Promise<string> | null = null;

export async function getUsername(): Promise<string> {
  if (cachedUsername) {
    return cachedUsername;
  }

  if (usernamePromise) {
    return usernamePromise;
  }

  usernamePromise = (async () => {
    try {
      const octokit = await getOctokit();
      const { data: user } = await octokit.rest.users.getAuthenticated();
      cachedUsername = user.login;
      return cachedUsername;
    } finally {
      usernamePromise = null;
    }
  })();

  return usernamePromise;
}
