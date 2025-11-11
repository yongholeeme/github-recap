/**
 * React Query의 모든 Query Key를 중앙에서 관리
 * 타입 안정성과 일관성을 위해 팩토리 함수 패턴 사용
 */
export const queryKeys = {
  // Commits 관련
  commits: {
    all: () => ["github-commits"] as const,
    data: (year: number = new Date().getFullYear()) =>
      ["github-commit-data", year] as const,
  },

  // Pull Requests 관련
  pullRequests: {
    all: () => ["github-pull-requests"] as const,
    merged: () => ["github-merged-prs"] as const,
    approved: () => ["github-approved-prs"] as const,
    requestedChanges: () => ["github-requested-changes"] as const,
    reviews: () => ["github-pr-reviews"] as const,
    reviewComments: () => ["github-pr-review-comments"] as const,
    closedNotMerged: () => ["github-closed-not-merged-prs"] as const,
  },

  // Issues 관련
  issues: {
    all: () => ["github-issues"] as const,
    closed: () => ["github-closed-issues"] as const,
    comments: () => ["github-issue-comments"] as const,
  },

  // Repositories 관련
  repositories: {
    all: () => ["github-repositories"] as const,
    created: () => ["github-created-repos"] as const,
    contributed: () => ["github-contributed-repos"] as const,
  },

  // Mentions
  mentions: () => ["github-mentions"] as const,

  // Stats 관련
  stats: {
    lastYear: () => ["github-last-year-stats"] as const,
  },
} as const;
