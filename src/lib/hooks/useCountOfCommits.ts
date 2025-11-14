import { fetchCountOfCommits } from "@/lib/github/commits";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfCommits(year: number = new Date().getFullYear()) {
  return useQuery({
    queryKey: queryKeys.commits.count(year),
    queryFn: () => fetchCountOfCommits(year),
    staleTime: 0,
  });
}
