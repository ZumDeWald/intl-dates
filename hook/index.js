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
  const [dates, setDates] = useState({});

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

  // Set startValues with Intl -- locale must stay English here so switch above can match
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

      setDates((prevDates) => {
        return {
          ...prevDates,
          weekStartDate: sundayDate,
          weekEndDate: saturdayDate,
        };
      });
    }
  }, [startValues]);

  // Set base values to export
  useEffect(() => {
    if (startValues) {
      let dateYMD = `${startValues[6].value}-${startValues[2].value}-${startValues[4].value}`;

      let dateDMY = `${startValues[4].value}-${startValues[2].value}-${startValues[6].value}`;

      let dateMDY = `${startValues[2].value}-${startValues[4].value}-${startValues[6].value}`;

      setDates((prevDates) => {
        return {
          ...prevDates,
          dateYMD,
          dateDMY,
          dateMDY,
          monthNumeric: startValues[2].value,
          dayOfMonth: startValues[4].value,
          year: startValues[6].value,
        };
      });
    }
  }, [startValues]);

  // Set monthLong weekdayLong values to export
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayLongOptions
    );
    const formatted = formatter.formatToParts(new Date());

    setDates((prevDates) => {
      return {
        ...prevDates,
        monthLong: formatted[0].value,
        weekdayLong: formatted[2].value,
      };
    });
  }, [intlMonthWeekdayLongOptions, locale]);

  // Set monthShort and weekdayShort values to export
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayShortOptions
    );
    const formatted = formatter.formatToParts(new Date());

    setDates((prevDates) => {
      return {
        ...prevDates,
        monthShort: formatted[0].value,
        weekdayShort: formatted[2].value,
      };
    });
  }, [intlMonthWeekdayShortOptions, locale]);

  return dates;
}
