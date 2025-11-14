import { fetchCountOfMyMergedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyMergedPrs(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.merged(year),
    queryFn: () => fetchCountOfMyMergedPrs(year),
  });
}
