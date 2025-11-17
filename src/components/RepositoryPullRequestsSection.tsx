import { useYear } from "@/contexts/YearContext";
import { useRepositoryPullRequests } from "@/lib/hooks/useRepositoryPullRequests";
import RepositoryStatsSection from "@/components/RepositoryStatsSection";

export default function RepositoryPullRequestsSection() {
  const { year } = useYear();
  const { data, isFetching } = useRepositoryPullRequests(year);

  const repos = data?.map((repo) => ({
    repo: repo.repo,
    owner: repo.username,
    count: repo.prCount,
  }));

  return (
    <RepositoryStatsSection
      title="저장소별 PR 기여도"
      subtitle="가장 많은 Pull Request를 생성한 저장소들"
      data={repos}
      isFetching={isFetching}
      countLabel="PR"
      linkType="pulls"
      colorScheme={{
        primary: "#f97316",
        secondary: "#f59e0b",
        accent: "#fb923c",
      }}
    />
  );
}
