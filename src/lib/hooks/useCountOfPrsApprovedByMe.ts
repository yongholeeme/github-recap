import { fetchCountOfPrsApprovedByMe } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsApprovedByMe(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.approved(year),
    queryFn: () => fetchCountOfPrsApprovedByMe(year),
  });
}
