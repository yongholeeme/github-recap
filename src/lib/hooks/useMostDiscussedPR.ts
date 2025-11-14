import { fetchMostDiscussedPR } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedPR(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.mostDiscussed(year),
    queryFn: () => fetchMostDiscussedPR(year),
  });
}
