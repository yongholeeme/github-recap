import { fetchMostDiscussedDiscussion } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedDiscussion(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.discussions.mostDiscussed(year),
    queryFn: () => fetchMostDiscussedDiscussion(year),
  });
}
