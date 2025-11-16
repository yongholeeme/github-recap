import { config } from "@/../config";
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";

export function getDateRange(year: number) {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 11, 31));

  return {
    startDate: format(yearStart, "yyyy-MM-dd"),
    endDate: format(yearEnd, "yyyy-MM-dd"),
  };
}

export function getMonthDateRange(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  return {
    startDate: format(monthStart, "yyyy-MM-dd"),
    endDate: format(monthEnd, "yyyy-MM-dd"),
  };
}

export async function fetcher<T = unknown>({
  pathname,
  q,
  per_page,
  page = 1,
  sort,
  order,
}: {
  pathname: string;
  q: string;
  per_page: number;
  page?: number;
  sort?: string;
  order?: string;
}): Promise<T> {
  const url = new URL(`${config.github.baseUrl}${pathname}`);
  url.searchParams.append("q", q);
  url.searchParams.append("per_page", String(per_page));
  url.searchParams.append("page", String(page));

  if (sort) {
    url.searchParams.append("sort", sort);
  }
  if (order) {
    url.searchParams.append("order", order);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("github_pat_token")}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
