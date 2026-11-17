import { DateTime } from 'luxon';

// `dateTime` filter: the full date and time, in ISO format and UTC (eg. 2020-02-22T09:50:00.000Z).
// For machine-readable places: the structured data (`components/chrome/schemas/`) and the sitemap's `<lastmod>`.
// It takes no format argument. For a readable date, use `dateTimeReadable` instead.
// {{ date | dateTime }}

export const dateTime = (dateObj) =>
  DateTime.fromJSDate(dateObj, {
    zone: 'UTC',
  }).toISO();
