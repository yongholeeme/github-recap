import { fetchCountOfPrsRequestedChangeByMe } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsRequestedChangeByMe(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.requestedChanges(year),
    queryFn: () => fetchCountOfPrsRequestedChangeByMe(year),
  });
}
