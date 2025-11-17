import { fetchCountOfIssueComments } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfIssueComments(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfIssueComments(year),
    queryFn: () => fetchCountOfIssueComments(year),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!user,
  });
}
