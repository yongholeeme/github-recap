import { fetchCountOfMentionsMe } from "@/lib/github/issues";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfMentionsMe(year: number = new Date().getFullYear()) {
  return useQuery({
    queryKey: queryKeys.mentions.received(year),
    queryFn: () => fetchCountOfMentionsMe(year),
  });
}
