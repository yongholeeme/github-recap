import { fetchCountOfCommentsByMeToPr } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfCommentsByMeToPr(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.reviewComments(year),
    queryFn: () => fetchCountOfCommentsByMeToPr(year),
  });
}
