import { fetchCountOfMyClosedPrsNotMerged } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyClosedPrsNotMerged(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.closedNotMerged(year),
    queryFn: () => fetchCountOfMyClosedPrsNotMerged(year),
  });
}
