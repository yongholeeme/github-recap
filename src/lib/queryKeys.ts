/**
 * React Query의 모든 Query Key를 중앙에서 관리
 * 타입 안정성과 일관성을 위해 팩토리 함수 패턴 사용
 */
export const queryKeys = {
  // Commits 관련
  commits: {
    count: (year: number) =>
      ["github-commit-count", year] as const,
    byMonth: (year: number, month: number) =>
      ["commits", year, month] as const,
  },

  // Pull Requests 관련
  pullRequests: {
    merged: (year: number) =>
      ["github-merged-prs", year] as const,
    approved: (year: number) =>
      ["github-approved-prs", year] as const,
    requestedChanges: (year: number) =>
      ["github-requested-changes", year] as const,
    reviewComments: (year: number) =>
      ["github-pr-review-comments", year] as const,
    closedNotMerged: (year: number) =>
      ["github-closed-not-merged-prs", year] as const,
    mostDiscussed: (year: number) =>
      ["github-most-discussed-pr", year] as const,
    participated: (year: number) =>
      ["github-participated-prs", year] as const,
    myCreated: (year: number) =>
      ["github-my-created-prs", year] as const,
    reviewedByMe: (year: number) =>
      ["github-prs-reviewed-by-me", year] as const,
    myMerged: (year: number, month: number) => ['prs', year, month] as const,
  },

  // Issues 관련
  issues: {
    comments: (year: number) =>
      ["github-issue-comments", year] as const,
    participated: (year: number) =>
      ["github-participated-issues", year] as const,
    mostDiscussed: (year: number) =>
      ["github-most-discussed-issue", year] as const,
  },

  // Mentions
  mentions: {
    received: (year: number) =>
      ["github-mentions-received", year] as const,
    receivedBy: (year: number) =>
      ["github-mentions-received-by", year] as const,
  },

  // Discussions 관련
  discussions: {
    comments: (year: number) =>
      ["github-discussion-comments", year] as const,
    participated: (year: number) =>
      ["github-participated-discussions", year] as const,
    mostDiscussed: (year: number) =>
      ["github-most-discussed-discussion", year] as const,
  },
} as const;
