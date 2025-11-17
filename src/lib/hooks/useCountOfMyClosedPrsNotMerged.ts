import { fetchCountOfMyClosedPrsNotMerged } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyClosedPrsNotMerged(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfMyClosedPrsNotMerged(year),
    queryFn: () => fetchCountOfMyClosedPrsNotMerged(year),
    enabled: !!user,
  });
}
