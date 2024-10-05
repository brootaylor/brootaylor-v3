import { DateTime } from 'luxon';

// Add a friendly date filter to nunjucks.
// Defaults to format of LLLL d, y unless an
// alternate is passed as a parameter.
// {{ date | friendlyDate('OPTIONAL FORMAT STRING') }}
// List of supported tokens: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens

export const dateTimeReadable = (dateObj, format = 'LLL d, y') =>
  DateTime.fromJSDate(dateObj, {
    zone: 'UTC',
  }).toFormat(format);
