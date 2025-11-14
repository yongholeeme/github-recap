import { fetchMyFastestMergedPR } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMyFastestMergedPR(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.fastest(year),
    queryFn: () => fetchMyFastestMergedPR(year),
  });
}
