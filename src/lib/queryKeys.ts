export const queryKeys = {
  useCountOfCommits: (year: number) => 
    ['useCountOfCommits', year] as const,
  useCommits: (year: number, month: number) => 
    ['useCommits', year, month] as const,

  useCountOfMyMergedPrs: (year: number) =>
    ['useCountOfMyMergedPrs', year] as const,

  useMyMergedPrs: (year: number, month: number) => 
    ['useMyMergedPrs', year, month] as const,

  useCountOfPrsApprovedByMe: (year: number) =>
    ['useCountOfPrsApprovedByMe', year] as const,

  useCountOfPrsRequestedChangeByMe: (year: number) =>
    ['useCountOfPrsRequestedChangeByMe', year] as const,

  useCountOfCommentsByMeToPr: (year: number) =>
    ['useCountOfCommentsByMeToPr', year] as const,

  useCountOfMyClosedPrsNotMerged: (year: number) =>
    ['useCountOfMyClosedPrsNotMerged', year] as const,

  useMostDiscussedPR: (year: number) =>
    ['useMostDiscussedPR', year] as const,

  useCountOfParticipatedPrs: (year: number) =>
    ['useCountOfParticipatedPrs', year] as const,

  useCountOfMyCreatedPrs: (year: number) =>
    ['useCountOfMyCreatedPrs', year] as const,

  useCountOfPrsReviewedByMe: (year: number) =>
    ['useCountOfPrsReviewedByMe', year] as const,

  useCountOfIssueComments: (year: number) =>
    ['useCountOfIssueComments', year] as const,

  useCountOfParticipatedIssues: (year: number) =>
    ['useCountOfParticipatedIssues', year] as const,

  useMostDiscussedIssue: (year: number) =>
    ['useMostDiscussedIssue', year] as const,

  useCountOfMentionsMe: (year: number) =>
    ['useCountOfMentionsMe', year] as const,

  usePeopleToMentionMe: (year: number, month: number) =>
    ['usePeopleToMentionMe', year, month] as const,

  useCountOfDiscussionComments: (year: number) =>
    ['useCountOfDiscussionComments', year] as const,

  useCountOfParticipatedDiscussions: (year: number) =>
    ['useCountOfParticipatedDiscussions', year] as const,

  useMostDiscussedDiscussion: (year: number) =>
    ['useMostDiscussedDiscussion', year] as const,
} as const;
