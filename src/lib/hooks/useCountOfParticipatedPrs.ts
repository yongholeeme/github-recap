import { fetchCountOfParticipatedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedPrs(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfParticipatedPrs(year),
    queryFn: () => fetchCountOfParticipatedPrs(year),
  });
}
