import { fetchCountOfDiscussionComments } from "@/lib/github/issues";
import { useUser } from "@/contexts/UserContext";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useCountOfDiscussionComments(year: number) {
  const user = useUser();

  return useQuery({
    queryKey: queryKeys.useCountOfDiscussionComments(year),
    queryFn: () => fetchCountOfDiscussionComments(year),
    enabled: !!user,
  });
}
