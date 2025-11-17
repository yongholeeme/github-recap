import { fetchCountOfMyCreatedPrs } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMyCreatedPrs(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfMyCreatedPrs(year),
    queryFn: () => fetchCountOfMyCreatedPrs(year),
    enabled: !!user,
  });
}
