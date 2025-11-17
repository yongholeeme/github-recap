import { fetchCountOfCommits } from "@/lib/github/commits";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfCommits(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfCommits(year),
    queryFn: () => fetchCountOfCommits(year),
    enabled: !!user,
  });
}
