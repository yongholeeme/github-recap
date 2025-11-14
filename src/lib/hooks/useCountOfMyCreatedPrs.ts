import { fetchCountOfMyCreatedPrs } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyCreatedPrs(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.pullRequests.myCreated(year),
    queryFn: () => fetchCountOfMyCreatedPrs(year),
  });
}
