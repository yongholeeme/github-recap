import { fetchCountOfParticipatedDiscussions } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedDiscussions(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfParticipatedDiscussions(year),
    queryFn: () => fetchCountOfParticipatedDiscussions(year),
  });
}
