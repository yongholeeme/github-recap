import { fetchCountOfMyCreatedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyCreatedPrs(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfMyCreatedPrs(year),
    queryFn: () => fetchCountOfMyCreatedPrs(year),
  });
}
