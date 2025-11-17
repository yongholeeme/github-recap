import { fetchCountOfParticipatedDiscussions } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfParticipatedDiscussions(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfParticipatedDiscussions(year),
    queryFn: () => fetchCountOfParticipatedDiscussions(year),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!user,
  });
}
