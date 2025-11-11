import { useQuery } from "@tanstack/react-query";
import { getAllCommitsData, getAllRepositoriesData } from "./github";

// 모든 커밋 관련 컴포넌트가 공유하는 커밋 데이터
export function useCommitsData(year: number = new Date().getFullYear()) {
  return useQuery({
    queryKey: ["github-commit-data", year],
    queryFn: () => getAllCommitsData(year),
  });
}

// 모든 레포지토리 관련 컴포넌트가 공유하는 레포 데이터
export function useRepositoriesData() {
  return useQuery({
    queryKey: ["github-repositories"],
    queryFn: () => getAllRepositoriesData(),
  });
}
