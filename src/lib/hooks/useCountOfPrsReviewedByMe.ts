import { fetchCountOfPrsReviewedByMe } from "@/lib/github/pullRequests";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfPrsReviewedByMe(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfPrsReviewedByMe(year),
    queryFn: () => fetchCountOfPrsReviewedByMe(year),
    enabled: !!user,
  });
}
