import { fetchMostDiscussedPR } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useMostDiscussedPR(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useMostDiscussedPR(year),
    queryFn: () => fetchMostDiscussedPR(year),
    enabled: !!user,
  });
}
