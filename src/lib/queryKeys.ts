// 중앙화된 Query Key 관리
export const queryKeys = {
  // 커밋 관련 (모두 getAllCommitsData 공유)
  commits: (year?: number) =>
    ["github-commits", year ?? new Date().getFullYear()] as const,
  commitData: (year?: number) =>
    ["github-commit-data", year ?? new Date().getFullYear()] as const,

  // 레포지토리 관련 (모두 getAllRepositoriesData 공유)
  repositories: ["github-repositories"] as const,

  // 카운트 관련
  issues: ["github-issues"] as const,
  pullRequests: ["github-pull-requests"] as const,
  pullRequestReviews: ["github-pr-reviews"] as const,

  // 기타
  lastYearStats: ["github-last-year-stats"] as const,
} as const;
