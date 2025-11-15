import { fetchMyMergedPRs } from '@/lib/github/pullRequests';
import { queryKeys } from "@/lib/queryKeys";
import { useQueries } from "@tanstack/react-query";

function useMyMergedPrs(year: number = new Date().getFullYear()) {
  const queries = useQueries({
    queries: Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
      queryKey: queryKeys.pullRequests.myMerged(year, month),
      queryFn: () => fetchMyMergedPRs(year, month),
    })),
  });

  return {
    data: queries.flatMap((query) => query.data ?? []),
    isFetching: queries.some((query) => query.isFetching),
  }
}

export function useMyAverageMergeTime(year: number = new Date().getFullYear()) {
  const {data, isFetching} = useMyMergedPrs(year)

  const averageMergeTime = (() => {
    if (!data || data.length === 0) return null;

    const mergedPrs = data.filter(pr => pr.mergedAt && pr.createdAt);
    if (mergedPrs.length === 0) return null;

    const totalHours = mergedPrs.reduce((sum, pr) => {
      const createdTime = new Date(pr.createdAt).getTime();
      const mergedTime = new Date(pr.mergedAt!).getTime();
      const hours = (mergedTime - createdTime) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);

    return totalHours / mergedPrs.length;
  })();

  return {
    data: averageMergeTime,
    isFetching
  }
}

export function useMyFastestMergedPr(year: number = new Date().getFullYear()) {
  const {data, isFetching} = useMyMergedPrs(year)

  const fastestPr = (() => {
    if (!data || data.length === 0) return null;

    const mergedPrs = data.filter(pr => pr.mergedAt && pr.createdAt);
    if (mergedPrs.length === 0) return null;

    let fastest: typeof mergedPrs[0] & { mergeTimeMs?: number } | null = null;

    for (const pr of mergedPrs) {
      const createdTime = new Date(pr.createdAt).getTime();
      const mergedTime = new Date(pr.mergedAt!).getTime();
      const mergeTimeMs = mergedTime - createdTime;

      if (!fastest) {
        fastest = { ...pr, mergeTimeMs };
        continue;
      }

      const fastestCreatedTime = new Date(fastest.createdAt).getTime();
      const fastestMergedTime = new Date(fastest.mergedAt!).getTime();
      const fastestMergeTimeMs = fastestMergedTime - fastestCreatedTime;

      if (mergeTimeMs < fastestMergeTimeMs) {
        fastest = { ...pr, mergeTimeMs };
      }
    }

    return fastest;
  })();

  return {
    data: fastestPr,
    isFetching
  }
}

export function useMySlowestMergedPr(year: number = new Date().getFullYear()) {
  const {data, isFetching} = useMyMergedPrs(year)

  const slowestPr = (() => {
    if (!data || data.length === 0) return null;

    const mergedPrs = data.filter(pr => pr.mergedAt && pr.createdAt);
    if (mergedPrs.length === 0) return null;

    let slowest: typeof mergedPrs[0] & { mergeTimeMs?: number } | null = null;

    for (const pr of mergedPrs) {
      const createdTime = new Date(pr.createdAt).getTime();
      const mergedTime = new Date(pr.mergedAt!).getTime();
      const mergeTimeMs = mergedTime - createdTime;

      if (!slowest) {
        slowest = { ...pr, mergeTimeMs };
        continue;
      }

      const slowestCreatedTime = new Date(slowest.createdAt).getTime();
      const slowestMergedTime = new Date(slowest.mergedAt!).getTime();
      const slowestMergeTimeMs = slowestMergedTime - slowestCreatedTime;

      if (mergeTimeMs > slowestMergeTimeMs) {
        slowest = { ...pr, mergeTimeMs };
      }
    }

    return slowest;
  })();

  return {
    data: slowestPr,
    isFetching
  }
}

