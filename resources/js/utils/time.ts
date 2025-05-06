export function getRelativeTimeFromDate(
    dateInput: Date | string,
    locales: string | string[] = 'id',
    options: Intl.RelativeTimeFormatOptions = { numeric: 'auto' },
): string {
    let date: Date;
    if (typeof dateInput === 'string') {
        date = new Date(dateInput);
    } else {
        date = dateInput;
    }

    if (isNaN(date.getTime())) {
        console.error(
            'Invalid date provided to getRelativeTimeFromDate',
            dateInput,
        );
        return 'Invalid date';
    }

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

export function getIndonesianRelativeTime(dateInput: Date | string): string {
    // Ensure we're working with a Date object
    let date: Date;
    if (typeof dateInput === 'string') {
        date = new Date(dateInput);
    } else {
        date = dateInput;
    }

    // Make sure the date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date provided:', dateInput);
        return 'Tanggal tidak valid';
    }

    const now = new Date();

    // Calculate time differences
    const diffInMs = now.getTime() - date.getTime(); // Reversed order for past dates

    // Convert to positive values for easier comparison
    const absDiffInMs = Math.abs(diffInMs);
    const diffInSeconds = Math.floor(absDiffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Future date case
    if (diffInMs < 0) {
        if (diffInDays < 1) {
            if (diffInHours < 1) {
                if (diffInMinutes < 1) {
                    return 'beberapa detik dari sekarang';
                }
                return `${diffInMinutes} menit dari sekarang`;
            }
            return `${diffInHours} jam dari sekarang`;
        } else if (diffInDays === 1) {
            return 'besok';
        } else if (diffInDays < 7) {
            return `${diffInDays} hari dari sekarang`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `${weeks} minggu dari sekarang`;
        } else if (diffInDays < 365) {
            const months = Math.floor(diffInDays / 30);
            return `${months} bulan dari sekarang`;
        } else {
            const years = Math.floor(diffInDays / 365);
            return `${years} tahun dari sekarang`;
        }
    }

    // Past date case (normal case)
    if (diffInDays < 1) {
        if (diffInHours < 1) {
            if (diffInMinutes < 1) {
                return 'baru saja';
            }
            return `${diffInMinutes} menit yang lalu`;
        }
        return `${diffInHours} jam yang lalu`;
    } else if (diffInDays === 1) {
        return 'kemarin';
    } else if (diffInDays < 7) {
        return `${diffInDays} hari yang lalu`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} minggu yang lalu`; // This is the "minggu lalu" case
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} bulan yang lalu`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years} tahun yang lalu`;
    }
}
