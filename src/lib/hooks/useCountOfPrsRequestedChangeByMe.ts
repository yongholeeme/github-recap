import { fetchCountOfPrsRequestedChangeByMe } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsRequestedChangeByMe(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfPrsRequestedChangeByMe(year),
    queryFn: () => fetchCountOfPrsRequestedChangeByMe(year),
    enabled: !!user,
  });
}
