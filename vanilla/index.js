export default function intlDates({ locale = "default", date = null } = {}) {
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

  const daysInMonth = (monthAsNum) => {
    switch (monthAsNum) {
      case 1:
        return 31;
      case 2:
        return 28;
      case 3:
        return 31;
      case 4:
        return 30;
      case 5:
        return 31;
      case 6:
        return 30;
      case 7:
        return 31;
      case 8:
        return 31;
      case 9:
        return 30;
      case 10:
        return 31;
      case 11:
        return 30;
      case 12:
        return 31;
      default:
        return null;
    }
  };

  // Set startValues with Intl -- locale needs to stay English here so switch above can match
  const baseFormatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
  const startValues = baseFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

  /* Derive this week start and end dates to export */
  // Week Start Date
  let weekStartDate;
  const beginOfMonthDiff = findStartOfWeek(startValues);

  if (beginOfMonthDiff <= 0) {
    let prevMonth = Number(startValues[2].value) - 1;
    if (prevMonth === 0) {
      prevMonth = 12;
    }
    const daysInPrevMonth = daysInMonth(prevMonth);

    weekStartDate = `${startValues[6].value}-${prevMonth}-${
      daysInPrevMonth + beginOfMonthDiff
    }`;
  } else {
    weekStartDate = `${startValues[6].value}-${startValues[2].value}-${beginOfMonthDiff}`;
  }

  // Week End Date
  let weekEndDate;
  const endOfMonthDiff =
    findEndOfWeek(startValues) - daysInMonth(Number(startValues[2].value));
  if (endOfMonthDiff > 0) {
    let nextMonth = Number(startValues[2].value) + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
    }

    weekEndDate = `${startValues[6].value}-${nextMonth}-${endOfMonthDiff}`;
  } else {
    weekEndDate = `${startValues[6].value}-${
      startValues[2].value
    }-${findEndOfWeek(startValues)}`;
  }

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
  const longFormatted = longFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

  const monthLong = longFormatted[0].value;
  const weekdayLong = longFormatted[2].value;

  // Set monthShort and weekdayShort values to export
  const shortFormatter = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayShortOptions
  );
  const shortFormatted = shortFormatter.formatToParts(
    !!date ? new Date(date) : new Date()
  );

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
