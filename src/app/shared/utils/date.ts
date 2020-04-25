/**
 * Function to compare if date greater that now for N days.
 * @param d Date.
 * @param days Amount of days to compare.
 */
export function isDateGreaterThan(d: Date, days: number): boolean {
  const now = new Date();
  const compareDate = new Date(now);
  compareDate.setDate(compareDate.getDate() + days);
  compareDate.setHours(0, 0, 0, 0);
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return compareDate < date;
}

/**
 * Parse date to 'yyyy-dd-mm' format
 *
 * @param d Date
 */
export function parseDateToFilterString(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
