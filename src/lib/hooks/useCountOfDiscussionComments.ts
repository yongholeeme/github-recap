import { fetchCountOfDiscussionComments } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfDiscussionComments(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.discussions.comments(year),
    queryFn: () => fetchCountOfDiscussionComments(year),
  });
}
