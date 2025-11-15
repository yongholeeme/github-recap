import { fetchMostDiscussedPR } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedPR(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useMostDiscussedPR(year),
    queryFn: () => fetchMostDiscussedPR(year),
  });
}
