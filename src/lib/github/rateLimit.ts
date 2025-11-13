import { getOctokit, getAuthType } from "./auth";

export async function logRateLimit(): Promise<void> {
  try {
    const octokit = await getOctokit();
    const { data } = await octokit.rest.rateLimit.get();

    const core = data.resources.core;
    const percentage = ((core.remaining / core.limit) * 100).toFixed(1);
    const resetDate = new Date(core.reset * 1000);
    const authType = getAuthType();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 GitHub API Rate Limit Status");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🔐 Auth Type: ${authType}`);
    console.log(`📈 Limit: ${core.limit.toLocaleString()} requests/hour`);
    console.log(
      `✅ Remaining: ${core.remaining.toLocaleString()} (${percentage}%)`
    );
    console.log(`🔴 Used: ${core.used.toLocaleString()}`);
    console.log(`⏰ Resets at: ${resetDate.toLocaleTimeString()}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Warning if low
    if (core.remaining < 100) {
      console.warn("⚠️ WARNING: API rate limit is running low!");
    }
  } catch (error) {
    console.error("Failed to fetch rate limit:", error);
  }
}

// Auto-log rate limit on import (optional)
if (typeof window !== "undefined") {
  // Log rate limit after a short delay to avoid blocking
  setTimeout(() => {
    logRateLimit();
  }, 2000);
}
