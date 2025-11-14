import { fetchCountOfParticipatedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedPrs(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.participated(year),
    queryFn: () => fetchCountOfParticipatedPrs(year),
  });
}
