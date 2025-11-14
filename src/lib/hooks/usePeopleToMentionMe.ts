import { fetchPeopleToMetionMe } from '@/lib/github/issues';
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function usePeopleToMentionMe(year = new Date().getFullYear(), count = 10) {
  return useQuery({
		queryKey: queryKeys.mentions.receivedBy(year),
    queryFn: () => fetchPeopleToMetionMe(year, count),
  });
}
