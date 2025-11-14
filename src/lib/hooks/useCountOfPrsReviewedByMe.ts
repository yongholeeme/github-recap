import { fetchCountOfPrsReviewedByMe } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsReviewedByMe(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.reviewedByMe(year),
    queryFn: () => fetchCountOfPrsReviewedByMe(year),
  });
}
