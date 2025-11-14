import { fetchCountOfParticipatedIssues } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedIssues(
  year: number = new Date().getFullYear()
) {
  return useQuery({
    queryKey: queryKeys.issues.participated(year),
    queryFn: () => fetchCountOfParticipatedIssues(year),
  });
}
