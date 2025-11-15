import { startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';

export function getDateRange(year: number = new Date().getFullYear()) {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 11, 31));
  
  return {
    startDate: format(yearStart, 'yyyy-MM-dd'),
    endDate: format(yearEnd, 'yyyy-MM-dd'),
  };
}

export function getMonthDateRange(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  return {
    startDate: format(monthStart, 'yyyy-MM-dd'),
    endDate: format(monthEnd, 'yyyy-MM-dd'),
  };
}