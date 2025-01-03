export function getRelativeTimeFromDate(
    date: Date,
    locales: string | string[] = 'id',
    options: Intl.RelativeTimeFormatOptions = { numeric: 'auto' },
): string {
    const rtf = new Intl.RelativeTimeFormat(locales, options);
    const now = new Date();

    const yearDiff = date.getFullYear() - now.getFullYear();
    const monthDiff = date.getMonth() - now.getMonth() + yearDiff * 12;

    const diffInMs = date.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    // Find the appropriate unit with more accurate thresholds
    if (Math.abs(yearDiff) >= 1) {
        return rtf.format(yearDiff, 'year');
    } else if (Math.abs(monthDiff) >= 1) {
        return rtf.format(monthDiff, 'month');
    } else if (Math.abs(diffInWeeks) >= 1) {
        return rtf.format(diffInWeeks, 'week');
    } else if (Math.abs(diffInDays) >= 1) {
        return rtf.format(diffInDays, 'day');
    } else if (Math.abs(diffInHours) >= 1) {
        return rtf.format(diffInHours, 'hour');
    } else {
        return rtf.format(diffInMinutes, 'minute');
    }
}
