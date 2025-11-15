import { fetchCountOfMyMergedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyMergedPrs(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfMyMergedPrs(year),
    queryFn: () => fetchCountOfMyMergedPrs(year),
  });
}
