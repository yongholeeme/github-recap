// Query key prefix for selective invalidation
export const QUERY_PREFIX = {
    YEAR: 'year', // Year-based queries (past years are immutable)
} as const

export const queryKeys = {
    // Batched counts query (all year-based counts in single request)
    useAllCounts: (year: number) => [QUERY_PREFIX.YEAR, year, 'useAllCounts'] as const,

    // Year based queries: ['year', year, 'queryName']
    useCountOfCommits: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfCommits'] as const,
    useCountOfMyMergedPrs: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfMyMergedPrs'] as const,
    useCountOfPrsApprovedByMe: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfPrsApprovedByMe'] as const,
    useCountOfPrsRequestedChangeByMe: (year: number) =>
        [QUERY_PREFIX.YEAR, year, 'useCountOfPrsRequestedChangeByMe'] as const,
    useCountOfCommentsByMeToPr: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfCommentsByMeToPr'] as const,
    useCountOfMyClosedPrsNotMerged: (year: number) =>
        [QUERY_PREFIX.YEAR, year, 'useCountOfMyClosedPrsNotMerged'] as const,
    useMostDiscussedPR: (year: number) => [QUERY_PREFIX.YEAR, year, 'useMostDiscussedPR'] as const,
    useCountOfParticipatedPrs: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfParticipatedPrs'] as const,
    useCountOfMyCreatedPrs: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfMyCreatedPrs'] as const,
    useCountOfPrsReviewedByMe: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfPrsReviewedByMe'] as const,
    useCountOfIssueComments: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfIssueComments'] as const,
    useCountOfParticipatedIssues: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfParticipatedIssues'] as const,
    useMostDiscussedIssue: (year: number) => [QUERY_PREFIX.YEAR, year, 'useMostDiscussedIssue'] as const,
    useCountOfMentionsMe: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfMentionsMe'] as const,
    useCountOfDiscussionComments: (year: number) => [QUERY_PREFIX.YEAR, year, 'useCountOfDiscussionComments'] as const,
    useCountOfParticipatedDiscussions: (year: number) =>
        [QUERY_PREFIX.YEAR, year, 'useCountOfParticipatedDiscussions'] as const,
    useMostDiscussedDiscussion: (year: number) => [QUERY_PREFIX.YEAR, year, 'useMostDiscussedDiscussion'] as const,
    useRepositoryCommits: (year: number) => [QUERY_PREFIX.YEAR, year, 'useRepositoryCommits'] as const,
    useRepositoryPullRequests: (year: number) => [QUERY_PREFIX.YEAR, year, 'useRepositoryPullRequests'] as const,
    useRepositoryIssuesDiscussions: (year: number) =>
        [QUERY_PREFIX.YEAR, year, 'useRepositoryIssuesDiscussions'] as const,
} as const
