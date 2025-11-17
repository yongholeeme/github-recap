import { useYear } from "@/contexts/YearContext";
import { useRepositoryIssuesDiscussions } from "@/lib/hooks/useRepositoryIssuesDiscussions";
import RepositoryStatsSection from "@/components/RepositoryStatsSection";

export default function RepositoryIssuesDiscussionsSection() {
  const { year } = useYear();
  const { data, isFetching } = useRepositoryIssuesDiscussions(year);

  const repos = data?.map((repo) => ({
    repo: repo.repo,
    owner: repo.username,
    count: repo.totalCount,
  }));

  return (
    <RepositoryStatsSection
      title="저장소별 이슈 참여도"
      subtitle="가장 많이 참여한 이슈가 있는 저장소들"
      data={repos}
      isFetching={isFetching}
      countLabel="이슈"
      linkType="issues"
      colorScheme={{
        primary: "#10b981",
        secondary: "#14b8a6",
        accent: "#34d399",
      }}
    />
  );
}
