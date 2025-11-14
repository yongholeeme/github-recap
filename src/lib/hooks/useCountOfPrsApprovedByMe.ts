import { fetchCountOfPrsApprovedByMe } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsApprovedByMe(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.approved(year),
    queryFn: () => fetchCountOfPrsApprovedByMe(year),
  });
}
