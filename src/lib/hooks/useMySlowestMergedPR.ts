import { fetchMySlowestMergedPR } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMySlowestMergedPR(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.slowest(year),
    queryFn: () => fetchMySlowestMergedPR(year),
  });
}
