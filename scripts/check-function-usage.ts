import { execSync } from "child_process";

const functions = [
  "calculateTotalStarsReceived",
  "calculateTotalForksReceived",
  "calculateLongestCommitMessage",
  "calculateShortestCommitMessage",
  "calculateAverageCommitMessageLength",
  "calculateLatestCommitHour",
  "calculateMostActiveHour",
  "calculateCommitsByHour",
  "calculateCommitsByDayOfWeek",
  "calculateActiveDaysCount",
  "calculateLongestStreak",
  "calculateNightOwlScore",
  "calculateTopLanguages",
  "calculateCommitTimeline",
];

console.log("Checking calculate function usage...\n");

for (const func of functions) {
  try {
    const result = execSync(
      `grep -r "${func}" src --include="*.ts" --include="*.tsx" | wc -l`,
      { encoding: "utf-8" }
    );
    const count = parseInt(result.trim());

    // github.ts에서 정의 + export = 최소 2번
    // 다른 곳에서 사용하지 않으면 총 2-3번
    if (count <= 3) {
      console.log(`✓ ${func}: ${count} usages (candidate for inlining)`);
    } else {
      console.log(`  ${func}: ${count} usages`);
    }
  } catch {
    console.log(`? ${func}: error checking`);
  }
}
