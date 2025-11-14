import { fetchCountOfParticipatedDiscussions } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedDiscussions(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.discussions.participated(year),
    queryFn: () => fetchCountOfParticipatedDiscussions(year),
  });
}
