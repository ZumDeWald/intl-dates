export default function intlDates({ locale = "default" } = {}) {
  // Set options passed to Intl calls
  const intlBaseOptions = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const intlMonthWeekdayLongOptions = {
    month: "long",
    weekday: "long",
  };

  const intlMonthWeekdayShortOptions = {
    month: "short",
    weekday: "short",
  };

  const findStartOfWeek = (intlValues) => {
    const weekday = intlValues[0].value;
    const dayOfMonth = intlValues[4].value;

    switch (weekday) {
      case "Sunday":
        return Number(dayOfMonth);
      case "Monday":
        return Number(dayOfMonth) - 1;
      case "Tuesday":
        return Number(dayOfMonth) - 2;
      case "Wednesday":
        return Number(dayOfMonth) - 3;
      case "Thursday":
        return Number(dayOfMonth) - 4;
      case "Friday":
        return Number(dayOfMonth) - 5;
      case "Saturday":
        return Number(dayOfMonth) - 6;
      default:
        return null;
    }
  };

  const findEndOfWeek = (intlValues) => {
    const weekday = intlValues[0].value;
    const dayOfMonth = intlValues[4].value;

    switch (weekday) {
      case "Sunday":
        return Number(dayOfMonth) + 6;
      case "Monday":
        return Number(dayOfMonth) + 5;
      case "Tuesday":
        return Number(dayOfMonth) + 4;
      case "Wednesday":
        return Number(dayOfMonth) + 3;
      case "Thursday":
        return Number(dayOfMonth) + 2;
      case "Friday":
        return Number(dayOfMonth) + 1;
      case "Saturday":
        return Number(dayOfMonth);
      default:
        return null;
    }
  };

  // Set startValues with Intl -- locale needs to stay English here so switch above can match
  const baseFormatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
  const startValues = baseFormatter.formatToParts(new Date());

  // Derive this week start and end dates to export
  const weekStartDate = `${startValues[6].value}-${
    startValues[2].value
  }-${findStartOfWeek(startValues)}`;

  const weekEndDate = `${startValues[6].value}-${
    startValues[2].value
  }-${findEndOfWeek(startValues)}`;

  // Set additional values to export
  const dateYMD = `${startValues[6].value}-${startValues[2].value}-${startValues[4].value}`;

  const dateDMY = `${startValues[4].value}-${startValues[2].value}-${startValues[6].value}`;

  const dateMDY = `${startValues[2].value}-${startValues[4].value}-${startValues[6].value}`;

  const monthNumeric = startValues[2].value;

  const dayOfMonth = startValues[4].value;

  const year = startValues[6].value;

  // Set monthLong weekdayLong values to export
  const longFormatter = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayLongOptions
  );
  const longFormatted = longFormatter.formatToParts(new Date());

  const monthLong = longFormatted[0].value;
  const weekdayLong = longFormatted[2].value;

  // Set monthShort and weekdayShort values to export
  const shortFormatter = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayShortOptions
  );
  const shortFormatted = shortFormatter.formatToParts(new Date());

  const monthShort = shortFormatted[0].value;
  const weekdayShort = shortFormatted[2].value;

  const dates = {
    weekStartDate,
    weekEndDate,
    dateYMD,
    dateDMY,
    dateMDY,
    weekdayLong,
    weekdayShort,
    dayOfMonth,
    monthNumeric,
    monthLong,
    monthShort,
    year,
  };

  return dates;
}
