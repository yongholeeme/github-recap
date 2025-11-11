export function getDateRange(year: number = new Date().getFullYear()) {
  return {
    startDate: `${year}-01-01T00:00:00Z`,
    endDate: `${year}-12-31T23:59:59Z`,
  };
}
