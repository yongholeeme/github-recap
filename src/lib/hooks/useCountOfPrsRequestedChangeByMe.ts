import { fetchCountOfPrsRequestedChangeByMe } from "@/lib/github/pullRequests";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsRequestedChangeByMe(
  year: number
) {
  return useQuery({
    queryKey: queryKeys.useCountOfPrsRequestedChangeByMe(year),
    queryFn: () => fetchCountOfPrsRequestedChangeByMe(year),
  });
}
