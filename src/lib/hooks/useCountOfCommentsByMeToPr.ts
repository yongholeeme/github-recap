import { fetchCountOfCommentsByMeToPr } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfCommentsByMeToPr(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfCommentsByMeToPr(year),
    queryFn: () => fetchCountOfCommentsByMeToPr(year),
    enabled: !!user,
  });
}
