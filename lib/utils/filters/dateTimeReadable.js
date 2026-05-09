import { DateTime } from 'luxon';

export const dateTimeReadable = (value, format = 'LLL d, y') => {
  if (!value) return '';

  if (value instanceof Date) {
    return DateTime.fromJSDate(value, { zone: 'UTC' }).toFormat(format);
  }

  if (typeof value === 'string') {
    const isoDate = DateTime.fromISO(value, { zone: 'UTC' });
    if (isoDate.isValid) {
      return isoDate.toFormat(format);
    }
  }

  return '';
};
