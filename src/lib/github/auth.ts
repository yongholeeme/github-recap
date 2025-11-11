import { Octokit } from "octokit";
import { supabase } from "@/lib/supabase";

export async function getOctokit(): Promise<Octokit> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.provider_token;
  if (!token) {
    throw new Error("GitHub 액세스 토큰이 없습니다. 다시 로그인해주세요.");
  }

  return new Octokit({ auth: token });
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
