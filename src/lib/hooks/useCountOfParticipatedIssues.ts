import { fetchCountOfParticipatedIssues } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedIssues(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfParticipatedIssues(year),
    queryFn: () => fetchCountOfParticipatedIssues(year),
    enabled: !!user,
  });
}
