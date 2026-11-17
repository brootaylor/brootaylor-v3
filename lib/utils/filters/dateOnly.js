import { DateTime } from 'luxon';

// `dateOnly` filter: the date part of a date, in ISO format and UTC (eg. 2020-02-22).
// Used in permalinks (eg. `/writing/2020-02-22/my-post`), so it must never change for an existing post.
// It takes no format argument. For a readable date, use `dateTimeReadable` instead.
// {{ date | dateOnly }}

export const dateOnly = (dateObj) =>
  DateTime.fromJSDate(dateObj, {
    zone: 'UTC',
  }).toISODate();
