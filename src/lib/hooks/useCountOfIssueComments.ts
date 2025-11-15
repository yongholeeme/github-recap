import { fetchCountOfIssueComments } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfIssueComments(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfIssueComments(year),
    queryFn: () => fetchCountOfIssueComments(year),
  });
}
