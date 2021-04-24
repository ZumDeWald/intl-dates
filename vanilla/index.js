export default function intlDates({
  locale = "default",
  date = null,
  weekStartsOn = "SUN",
} = {}) {
  // Ensure weekStartsOn is 3 letters all caps
  weekStartsOn = weekStartsOn.substr(0, 2).toUpperCase();

  // Set options passed to Intl calls
  const intlBaseOptions = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };

  const intlMonthLongOptions = {
    weekday: "long",
    month: "long",
  };

  const intlMonthWeekdayShortOptions = {
    weekday: "short",
    month: "short",
  };

  const findStartOfWeek = (weekday, dayNumeric) => {
    switch (weekday) {
      case "Sunday":
        return weekStartsOn === "MON" ? dayNumeric - 6 : dayNumeric;
      case "Monday":
        return weekStartsOn === "MON" ? dayNumeric : dayNumeric - 1;
      case "Tuesday":
        return weekStartsOn === "MON" ? dayNumeric - 1 : dayNumeric - 2;
      case "Wednesday":
        return weekStartsOn === "MON" ? dayNumeric - 2 : dayNumeric - 3;
      case "Thursday":
        return weekStartsOn === "MON" ? dayNumeric - 3 : dayNumeric - 4;
      case "Friday":
        return weekStartsOn === "MON" ? dayNumeric - 4 : dayNumeric - 5;
      case "Saturday":
        return weekStartsOn === "MON" ? dayNumeric - 5 : dayNumeric - 6;
      default:
        return null;
    }
  };

  const findEndOfWeek = (weekday, dayNumeric) => {
    switch (weekday) {
      case "Sunday":
        return weekStartsOn === "MON" ? dayNumeric : dayNumeric + 6;
      case "Monday":
        return weekStartsOn === "MON" ? dayNumeric + 6 : dayNumeric + 5;
      case "Tuesday":
        return weekStartsOn === "MON" ? dayNumeric + 5 : dayNumeric + 4;
      case "Wednesday":
        return weekStartsOn === "MON" ? dayNumeric + 4 : dayNumeric + 3;
      case "Thursday":
        return weekStartsOn === "MON" ? dayNumeric + 3 : dayNumeric + 2;
      case "Friday":
        return weekStartsOn === "MON" ? dayNumeric + 2 : dayNumeric + 1;
      case "Saturday":
        return weekStartsOn === "MON" ? dayNumeric + 1 : dayNumeric;
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
  let weekdayEng;
  let monthNumeric;
  let dayOfMonth;
  let year;

  const assignInitialValues = (intlObj) => {
    switch (intlObj.type) {
      case "literal":
        break;
      case "weekday":
        return (weekdayEng = intlObj.value);
      case "month":
        return (monthNumeric = intlObj.value);
      case "day":
        return (dayOfMonth = intlObj.value);
      case "year":
        return (year = intlObj.value);
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
  const beginOfMonthDiff = findStartOfWeek(weekdayEng, Number(dayOfMonth));

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
    findEndOfWeek(weekdayEng, Number(dayOfMonth)) -
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
      weekdayEng,
      Number(dayOfMonth)
    )}`;
  }

  // Set year/month/day values to export
  const dateYMD = `${year}-${monthNumeric}-${dayOfMonth}`;

  const dateDMY = `${dayOfMonth}-${monthNumeric}-${year}`;

  const dateMDY = `${monthNumeric}-${dayOfMonth}-${year}`;

  // Set weekdayLong monthLong values to export
  const longFormatted = new Intl.DateTimeFormat(
    locale,
    intlMonthLongOptions
  ).formatToParts(!!date ? new Date(date) : new Date());

  let weekdayLong;
  let monthLong;

  longFormatted.forEach((intlObj) => {
    if (intlObj.type === "weekday") {
      weekdayLong = intlObj.value;
    }
    if (intlObj.type === "month") {
      monthLong = intlObj.value;
    }
  });

  // Set weekdayShort monthShort values to export
  const shortFormatted = new Intl.DateTimeFormat(
    locale,
    intlMonthWeekdayShortOptions
  ).formatToParts(!!date ? new Date(date) : new Date());

  let weekdayShort;
  let monthShort;

  shortFormatted.forEach((intlObj) => {
    if (intlObj.type === "weekday") {
      weekdayShort = intlObj.value;
    }
    if (intlObj.type === "month") {
      monthShort = intlObj.value;
    }
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
