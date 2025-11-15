import { fetchMostDiscussedIssue } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedIssue(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.issues.mostDiscussed(year),
    queryFn: () => fetchMostDiscussedIssue(year),
  });
}
