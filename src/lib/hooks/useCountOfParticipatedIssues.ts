import { fetchCountOfParticipatedIssues } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedIssues(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfParticipatedIssues(year),
    queryFn: () => fetchCountOfParticipatedIssues(year),
  });
}
