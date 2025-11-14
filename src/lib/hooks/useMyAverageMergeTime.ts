import { fetchMyAverageMergeTime } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMyAverageMergeTime(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.averageMergeTime(year),
    queryFn: () => fetchMyAverageMergeTime(year),
  });
}
