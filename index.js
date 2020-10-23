import { useEffect, useState } from "react";

export default function useIntlDates({ locale = "default" } = {}) {
  const [intlBaseOptions] = useState({
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const [intlMonthWeekdayLongOptions] = useState({
    month: "long",
    weekday: "long",
  });
  const [intlMonthWeekdayShortOptions] = useState({
    month: "short",
    weekday: "short",
  });
  const [startValues, setStartValues] = useState();
  const [weekStartDate, setWeekStartDate] = useState();
  const [weekEndDate, setWeekEndDate] = useState();
  const [dateYMD, setdateYMD] = useState();
  const [dateDMY, setdateDMY] = useState();
  const [dateMDY, setdateMDY] = useState();
  const [weekdayLong, setWeekdayLong] = useState();
  const [weekdayShort, setWeekdayShort] = useState();
  const [dayOfMonth, setDayOfMonth] = useState();
  const [monthNumeric, setMonthNumeric] = useState();
  const [monthLong, setMonthLong] = useState();
  const [monthShort, setMonthShort] = useState();
  const [year, setYear] = useState();

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
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
    setStartValues(formatter.formatToParts(new Date()));
  }, [intlBaseOptions]);

  // Derive this week start and end dates and set in state
  useEffect(() => {
    if (startValues) {
      let sundayDate = `${startValues[6].value}-${
        startValues[2].value
      }-${findStartOfWeek(startValues)}`;
      let saturdayDate = `${startValues[6].value}-${
        startValues[2].value
      }-${findEndOfWeek(startValues)}`;

      setWeekStartDate(sundayDate);
      setWeekEndDate(saturdayDate);
    }
  }, [startValues]);

  // Set additional values to export
  useEffect(() => {
    if (startValues) {
      let dateYMDString = `${startValues[6].value}-${startValues[2].value}-${startValues[4].value}`;

      let dateDMYString = `${startValues[4].value}-${startValues[2].value}-${startValues[6].value}`;

      let dateMDYString = `${startValues[2].value}-${startValues[4].value}-${startValues[6].value}`;

      setdateYMD(dateYMDString);
      setdateDMY(dateDMYString);
      setdateMDY(dateMDYString);
      setWeekdayLong(startValues[0].value);
      setMonthNumeric(startValues[2].value);
      setYear(startValues[6].value);
    }
  }, [startValues]);

  // Set monthLong weekdayLong values
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      !!locale ? locale : "default",
      intlMonthWeekdayLongOptions
    );
    const formatted = formatter.formatToParts(new Date());

    setMonthLong(formatted[0].value);
    setWeekdayLong(formatted[2].value);
  }, [intlMonthWeekdayLongOptions, locale]);

  // Set monthShort and weekdayShort values
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      !!locale ? locale : "default",
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
