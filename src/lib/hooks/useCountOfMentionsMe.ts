import { fetchCountOfMentionsMe } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMentionsMe(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfMentionsMe(year),
    queryFn: () => fetchCountOfMentionsMe(year),
    enabled: !!user,
  });
}
