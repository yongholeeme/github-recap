import { fetchCountOfMentionsMe } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMentionsMe(year: number) {
  return useQuery({
    queryKey: queryKeys.useCountOfMentionsMe(year),
    queryFn: () => fetchCountOfMentionsMe(year),
  });
}
