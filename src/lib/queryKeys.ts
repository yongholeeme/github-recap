/**
 * React Query의 모든 Query Key를 중앙에서 관리
 * 타입 안정성과 일관성을 위해 팩토리 함수 패턴 사용
 */
export const queryKeys = {
  // Commits 관련
  commits: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-commits", year] as const,
    data: (year: number = new Date().getFullYear()) =>
      ["github-commit-data", year] as const,
  },

  // Pull Requests 관련
  pullRequests: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-pull-requests", year] as const,
    merged: (year: number = new Date().getFullYear()) =>
      ["github-merged-prs", year] as const,
    approved: (year: number = new Date().getFullYear()) =>
      ["github-approved-prs", year] as const,
    requestedChanges: (year: number = new Date().getFullYear()) =>
      ["github-requested-changes", year] as const,
    reviews: (year: number = new Date().getFullYear()) =>
      ["github-pr-reviews", year] as const,
    reviewComments: (year: number = new Date().getFullYear()) =>
      ["github-pr-review-comments", year] as const,
    closedNotMerged: (year: number = new Date().getFullYear()) =>
      ["github-closed-not-merged-prs", year] as const,
    mostDiscussed: (year: number = new Date().getFullYear()) =>
      ["github-most-discussed-pr", year] as const,
    averageMergeTime: (year: number = new Date().getFullYear()) =>
      ["github-average-merge-time", year] as const,
    fastest: (year: number = new Date().getFullYear()) =>
      ["github-fastest-merged-pr", year] as const,
    slowest: (year: number = new Date().getFullYear()) =>
      ["github-slowest-merged-pr", year] as const,
  },

  // Issues 관련
  issues: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-issues", year] as const,
    closed: (year: number = new Date().getFullYear()) =>
      ["github-closed-issues", year] as const,
    comments: (year: number = new Date().getFullYear()) =>
      ["github-issue-comments", year] as const,
    participated: (year: number = new Date().getFullYear()) =>
      ["github-participated-issues", year] as const,
    mostDiscussed: (year: number = new Date().getFullYear()) =>
      ["github-most-discussed-issue", year] as const,
  },

  // Repositories 관련
  repositories: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-repositories", year] as const,
    created: (year: number = new Date().getFullYear()) =>
      ["github-created-repos", year] as const,
    contributed: (year: number = new Date().getFullYear()) =>
      ["github-contributed-repos", year] as const,
  },

  // Mentions
  mentions: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-mentions", year] as const,
    received: (year: number = new Date().getFullYear()) =>
      ["github-mentions-received", year] as const,
    receivedBy: (year: number = new Date().getFullYear()) =>
      ["github-mentions-received-by", year] as const,
    sent: (year: number = new Date().getFullYear()) =>
      ["github-mentions-sent", year] as const,
    sentTo: (year: number = new Date().getFullYear()) =>
      ["github-mentions-sent-to", year] as const,
  },

  // Discussions 관련
  discussions: {
    all: (year: number = new Date().getFullYear()) =>
      ["github-discussions", year] as const,
    created: (year: number = new Date().getFullYear()) =>
      ["github-created-discussions", year] as const,
    comments: (year: number = new Date().getFullYear()) =>
      ["github-discussion-comments", year] as const,
    participated: (year: number = new Date().getFullYear()) =>
      ["github-participated-discussions", year] as const,
    mostDiscussed: (year: number = new Date().getFullYear()) =>
      ["github-most-discussed-discussion", year] as const,
  },

  // Stats 관련
  stats: {
    lastYear: (year: number = new Date().getFullYear()) =>
      ["github-last-year-stats", year] as const,
  },
} as const;
