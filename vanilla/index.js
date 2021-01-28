export default function intlDates({ locale = "default", date = null } = {}) {
  // Set options passed to Intl calls
  const intlBaseOptions = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };

  const intlMonthLongOptions = {
    month: "long",
  };

  const intlMonthWeekdayShortOptions = {
    weekday: "short",
    month: "short",
  };

  const findStartOfWeek = (weekday, dayNumeric) => {
    switch (weekday) {
      case "Sunday":
        return dayNumeric;
      case "Monday":
        return dayNumeric - 1;
      case "Tuesday":
        return dayNumeric - 2;
      case "Wednesday":
        return dayNumeric - 3;
      case "Thursday":
        return dayNumeric - 4;
      case "Friday":
        return dayNumeric - 5;
      case "Saturday":
        return dayNumeric - 6;
      default:
        return null;
    }
  };

  const findEndOfWeek = (weekday, dayNumeric) => {
    switch (weekday) {
      case "Sunday":
        return dayNumeric + 6;
      case "Monday":
        return dayNumeric + 5;
      case "Tuesday":
        return dayNumeric + 4;
      case "Wednesday":
        return dayNumeric + 3;
      case "Thursday":
        return dayNumeric + 2;
      case "Friday":
        return dayNumeric + 1;
      case "Saturday":
        return dayNumeric;
      default:
        return null;
    }
  };

  const daysInMonth = (monthAsNum, yearAsNum) => {
    switch (monthAsNum) {
      case 1:
        return 31;
      case 2:
        // Determine if it is a leap year and adjust Feburary if needed
        if (yearAsNum % 4 !== 0) {
          return 28;
        } else if (yearAsNum % 100 !== 0) {
          return 29;
        } else if (yearAsNum % 400 !== 0) {
          return 28;
        } else {
          return 29;
        }
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
  const startValues = new Intl.DateTimeFormat(
    "en-US",
    intlBaseOptions
  ).formatToParts(!!date ? new Date(date) : new Date());

  // Loop through Intl return and assign values based on correct type
  let weekdayLong;
  let monthNumeric;
  let dayOfMonth;
  let year;

  const assignInitialValues = (objFromIntlArray) => {
    switch (objFromIntlArray.type) {
      case "literal":
        break;
      case "weekday":
        return (weekdayLong = objFromIntlArray.value);
      case "month":
        return (monthNumeric = objFromIntlArray.value);
      case "day":
        return (dayOfMonth = objFromIntlArray.value);
      case "year":
        return (year = objFromIntlArray.value);
      default:
        break;
    }
  };

  startValues.forEach((item) => {
    assignInitialValues(item);
  });

  /* === Derive this week start and end dates to export === */

  // Week Start Date
  let weekStartDate;
  const beginOfMonthDiff = findStartOfWeek(weekdayLong, Number(dayOfMonth));

  // Check if start of week is in previous month
  if (beginOfMonthDiff <= 0) {
    let prevYear = null;
    let prevMonth = Number(monthNumeric) - 1;

    // Make date adjustments if start of week is in previous year
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = Number(year) - 1;
    }

    const daysInPrevMonth = daysInMonth(prevMonth, Number(year));

    weekStartDate = `${prevYear || year}-${prevMonth}-${
      daysInPrevMonth + beginOfMonthDiff
    }`;
  } else {
    weekStartDate = `${year}-${monthNumeric}-${beginOfMonthDiff}`;
  }

  // Week End Date
  let weekEndDate;
  const endOfMonthDiff =
    findEndOfWeek(weekdayLong, Number(dayOfMonth)) -
    daysInMonth(Number(monthNumeric), Number(year));

  // Check if end of week is in next month
  if (endOfMonthDiff > 0) {
    let nextYear = null;
    let nextMonth = Number(monthNumeric) + 1;

    // Make date adjustments if end of week is in next year
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = Number(year) + 1;
    }

    weekEndDate = `${nextYear || year}-${nextMonth}-${endOfMonthDiff}`;
  } else {
    weekEndDate = `${year}-${monthNumeric}-${findEndOfWeek(
      weekdayLong,
      Number(dayOfMonth)
    )}`;
  }

  // Set additional values to export
  const dateYMD = `${year}-${monthNumeric}-${dayOfMonth}`;

  const dateDMY = `${dayOfMonth}-${monthNumeric}-${year}`;

  const dateMDY = `${monthNumeric}-${dayOfMonth}-${year}`;

  // Set monthLong values to export
  const longFormatted = new Intl.DateTimeFormat(
    locale,
    intlMonthLongOptions
  ).formatToParts(!!date ? new Date(date) : new Date());

  const monthLong = longFormatted[0].value;

  // Set monthShort and weekdayShort values to export
  const shortFormatted = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayShortOptions
  ).formatToParts(!!date ? new Date(date) : new Date());

  let weekdayShort;
  let monthShort;

  const assignShortValues = (objFromIntlArray) => {
    switch (objFromIntlArray.type) {
      case "literal":
        break;
      case "weekday":
        return (weekdayShort = objFromIntlArray.value);
      case "month":
        return (monthShort = objFromIntlArray.value);
    }
  };

  shortFormatted.forEach((item) => {
    assignShortValues(item);
  });

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
