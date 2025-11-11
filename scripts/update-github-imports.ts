import * as fs from "node:fs";
import * as path from "node:path";

// 함수명과 새로운 import 경로 매핑
const functionToModule: Record<string, string> = {
  // commits
  getAllCommitsData: "@/lib/github/commits",
  getCommitsCount: "@/lib/github/commits",
  calculateLongestCommitMessage: "@/lib/github/commits",
  getLongestCommitMessage: "@/lib/github/commits",
  calculateShortestCommitMessage: "@/lib/github/commits",
  getShortestCommitMessage: "@/lib/github/commits",
  calculateAverageCommitMessageLength: "@/lib/github/commits",
  getAverageCommitMessageLength: "@/lib/github/commits",
  calculateMostActiveHour: "@/lib/github/commits",
  getMostActiveHour: "@/lib/github/commits",
  calculateCommitsByHour: "@/lib/github/commits",
  getCommitsByHour: "@/lib/github/commits",
  calculateCommitsByDayOfWeek: "@/lib/github/commits",
  getCommitsByDayOfWeek: "@/lib/github/commits",
  calculateActiveDaysCount: "@/lib/github/commits",
  getActiveDaysCount: "@/lib/github/commits",
  calculateLongestStreak: "@/lib/github/commits",
  getLongestStreak: "@/lib/github/commits",
  calculateNightOwlScore: "@/lib/github/commits",
  getNightOwlScore: "@/lib/github/commits",
  calculateCommitTimeline: "@/lib/github/commits",
  getCommitTimeline: "@/lib/github/commits",

  // issues
  getIssuesCount: "@/lib/github/issues",
  getClosedIssuesCount: "@/lib/github/issues",
  getIssueCommentsCount: "@/lib/github/issues",
  getMentionsCount: "@/lib/github/issues",

  // pullRequests
  getPullRequestsCount: "@/lib/github/pullRequests",
  getMergedPullRequestsCount: "@/lib/github/pullRequests",
  getPullRequestReviewsCount: "@/lib/github/pullRequests",
  getApprovedPullRequestsCount: "@/lib/github/pullRequests",
  getRequestedChangesPullRequestsCount: "@/lib/github/pullRequests",
  getPullRequestReviewCommentsCount: "@/lib/github/pullRequests",
  getPullRequestDiscussionsCount: "@/lib/github/pullRequests",

  // repositories
  getAllRepositoriesData: "@/lib/github/repositories",
  getCreatedReposCount: "@/lib/github/repositories",
  getContributedReposCount: "@/lib/github/repositories",
  calculateTopLanguages: "@/lib/github/repositories",
  getTopLanguages: "@/lib/github/repositories",

  // stats
  getLastYearStats: "@/lib/github/stats",
};

function updateFile(filePath: string) {
  let content = fs.readFileSync(filePath, "utf-8");

  // @/lib/github에서 import하는 패턴 찾기
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@\/lib\/github['"]/g;
  const matches = [...content.matchAll(importRegex)];

  if (matches.length === 0) return false;

  let modified = false;

  for (const match of matches) {
    const fullImport = match[0];
    const importedItems = match[1].split(",").map((item) => item.trim());

    // 각 함수가 속한 모듈별로 그룹화
    const moduleGroups: Record<string, string[]> = {};

    for (const item of importedItems) {
      const module = functionToModule[item];
      if (module) {
        if (!moduleGroups[module]) {
          moduleGroups[module] = [];
        }
        moduleGroups[module].push(item);
      }
    }

    // 새로운 import 문 생성
    const newImports = Object.entries(moduleGroups)
      .map(
        ([module, items]) => `import { ${items.join(", ")} } from '${module}';`
      )
      .join("\n");

    content = content.replace(fullImport, newImports);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    return true;
  }

  return false;
}

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        walkDir(filePath, callback);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      callback(filePath);
    }
  }
}

const srcDir = path.join(process.cwd(), "src");
let updatedCount = 0;

walkDir(srcDir, (filePath) => {
  if (updateFile(filePath)) {
    console.log(`✅ Updated: ${filePath.replace(process.cwd(), "")}`);
    updatedCount++;
  }
});

console.log(`\n📊 Total files updated: ${updatedCount}`);
