import { readFileSync, writeFileSync } from "fs";

const files = [
  {
    path: "src/components/stats/CreatedIssuesCard.tsx",
    oldKey: '["github-issues"]',
    newKey: "queryKeys.issues.all()",
  },
  {
    path: "src/components/stats/CreatedPullRequestsCard.tsx",
    oldKey: '["github-pull-requests"]',
    newKey: "queryKeys.pullRequests.all()",
  },
  {
    path: "src/components/stats/PullRequestReviewsCard.tsx",
    oldKey: '["github-pr-reviews"]',
    newKey: "queryKeys.pullRequests.reviews()",
  },
  {
    path: "src/components/stats/ClosedIssuesCard.tsx",
    oldKey: '["github-closed-issues"]',
    newKey: "queryKeys.issues.closed()",
  },
  {
    path: "src/components/stats/IssueCommentsCard.tsx",
    oldKey: '["github-issue-comments"]',
    newKey: "queryKeys.issues.comments()",
  },
  {
    path: "src/components/stats/MergedPullRequestsCard.tsx",
    oldKey: '["github-merged-prs"]',
    newKey: "queryKeys.pullRequests.merged()",
  },
  {
    path: "src/components/stats/ApprovedPullRequestsCard.tsx",
    oldKey: '["github-approved-prs"]',
    newKey: "queryKeys.pullRequests.approved()",
  },
  {
    path: "src/components/stats/RequestedChangesPullRequestsCard.tsx",
    oldKey: '["github-requested-changes"]',
    newKey: "queryKeys.pullRequests.requestedChanges()",
  },
  {
    path: "src/components/stats/PullRequestReviewCommentsCard.tsx",
    oldKey: '["github-pr-review-comments"]',
    newKey: "queryKeys.pullRequests.reviewComments()",
  },
  {
    path: "src/components/stats/PullRequestDiscussionsCard.tsx",
    oldKey: '["github-pr-discussions"]',
    newKey: "queryKeys.pullRequests.discussions()",
  },
  {
    path: "src/components/stats/CreatedRepositoriesCard.tsx",
    oldKey: '["github-created-repos"]',
    newKey: "queryKeys.repositories.created()",
  },
  {
    path: "src/components/stats/ContributedRepositoriesCard.tsx",
    oldKey: '["github-contributed-repos"]',
    newKey: "queryKeys.repositories.contributed()",
  },
  {
    path: "src/components/stats/MentionsCard.tsx",
    oldKey: '["github-mentions"]',
    newKey: "queryKeys.mentions()",
  },
  {
    path: "src/components/stats/LatestCommitHourCard.tsx",
    oldKey: '["github-latest-commit-hour"]',
    newKey: "queryKeys.commits.latest()",
  },
  {
    path: "src/components/stats/YearOverYearGrowthCard.tsx",
    oldKey: '["github-last-year-stats"]',
    newKey: "queryKeys.stats.lastYear()",
  },
  {
    path: "src/components/GrowthSection.tsx",
    oldKey: '["github-last-year-stats"]',
    newKey: "queryKeys.stats.lastYear()",
  },
];

for (const file of files) {
  try {
    let content = readFileSync(file.path, "utf-8");

    // queryKeys import 추가
    if (!content.includes("import { queryKeys }")) {
      const lastImportIndex = content.lastIndexOf("import");
      const endOfLine = content.indexOf("\n", lastImportIndex);
      content =
        content.slice(0, endOfLine + 1) +
        "import { queryKeys } from '@/lib/queryKeys';\n" +
        content.slice(endOfLine + 1);
    }

    // queryKey 교체
    content = content.replace(
      new RegExp(
        `queryKey: ${file.oldKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "g"
      ),
      `queryKey: ${file.newKey}`
    );

    writeFileSync(file.path, content, "utf-8");
    console.log(`✓ ${file.path}`);
  } catch (err) {
    console.error(
      `✗ ${file.path}:`,
      err instanceof Error ? err.message : String(err)
    );
  }
}

console.log("\n✅ Done!");
