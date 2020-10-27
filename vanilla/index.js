export default function useIntlDates({ locale = "default" } = {}) {
  const [intlBaseOptions] = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const [intlMonthWeekdayLongOptions] = {
    month: "long",
    weekday: "long",
  };
  const [intlMonthWeekdayShortOptions] = {
    month: "short",
    weekday: "short",
  };
  let startValues;
  let weekStartDate;
  let weekEndDate;
  let dateYMD;
  let dateDMY;
  let dateMDY;
  let weekdayLong;
  let weekdayShort;
  let dayOfMonth;
  let monthNumeric;
  let monthLong;
  let monthShort;
  let year;

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

  // Set startValues with Intl
  const baseFormatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
  startValues = baseFormatter.formatToParts(new Date());

  // Derive this week start and end dates and set to variables
  weekStartDate = `${startValues[6].value}-${
    startValues[2].value
  }-${findStartOfWeek(startValues)}`;

  weekEndDate = `${startValues[6].value}-${
    startValues[2].value
  }-${findEndOfWeek(startValues)}`;

  // Set additional values to export
  dateYMD = `${startValues[6].value}-${startValues[2].value}-${startValues[4].value}`;

  dateDMY = `${startValues[4].value}-${startValues[2].value}-${startValues[6].value}`;

  dateMDY = `${startValues[2].value}-${startValues[4].value}-${startValues[6].value}`;

  monthNumeric = startValues[2].value;
  dayOfMonth = startValues[4].value;
  year = startValues[6].value;

  // Set monthLong weekdayLong values
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayLongOptions
    );
    const formatted = formatter.formatToParts(new Date());

    setMonthLong(formatted[0].value);
    setWeekdayLong(formatted[2].value);
  }, [intlMonthWeekdayLongOptions, locale]);

  // Set monthShort and weekdayShort values
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayShortOptions
    );
    const formatted = formatter.formatToParts(new Date());

    setMonthShort(formatted[0].value);
    setWeekdayShort(formatted[2].value);
  }, [intlMonthWeekdayShortOptions, locale]);

  let dates = {
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
