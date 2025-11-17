import { fetchCountOfPrsApprovedByMe } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsApprovedByMe(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfPrsApprovedByMe(year),
    queryFn: () => fetchCountOfPrsApprovedByMe(year),
    enabled: !!user,
  });
}
