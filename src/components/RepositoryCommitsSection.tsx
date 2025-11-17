import { useYear } from "@/contexts/YearContext";
import { useRepositoryCommits } from "@/lib/hooks/useRepositoryCommits";
import RepositoryStatsSection from "@/components/RepositoryStatsSection";

export default function RepositoryCommitsSection() {
  const { year } = useYear();
  const { data, isFetching } = useRepositoryCommits(year);

  const repos = data?.map((repo) => ({
    repo: repo.repo,
    owner: repo.username,
    count: repo.commitCount,
  }));

  return (
    <RepositoryStatsSection
      title="저장소별 커밋 기여도"
      subtitle="가장 많은 커밋을 남긴 저장소들"
      data={repos}
      isFetching={isFetching}
      countLabel="커밋"
      linkType="commits"
      colorScheme={{
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#60a5fa",
      }}
    />
  );
}
