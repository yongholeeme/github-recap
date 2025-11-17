import { fetchMostDiscussedIssue } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedIssue(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useMostDiscussedIssue(year),
    queryFn: () => fetchMostDiscussedIssue(year),
    enabled: !!user,
  });
}
