import { fetchCountOfDiscussionComments } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfDiscussionComments(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfDiscussionComments(year),
    queryFn: () => fetchCountOfDiscussionComments(year),
  });
}
