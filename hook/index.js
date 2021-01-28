import { useEffect, useState } from "react";

export default function useIntlDates({ locale = "default", date = null } = {}) {
  const [intlBaseOptions] = useState({
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const [intlMonthWeekdayLongOptions] = useState({
    month: "long",
  });

  const [intlMonthWeekdayShortOptions] = useState({
    weekday: "short",
    month: "short",
  });

  const [startValues, setStartValues] = useState();
  const [startValuesYear, setStartValuesYear] = useState();
  const [startValuesMonth, setStartValuesMonth] = useState();
  const [startValuesDayNum, setStartValuesDayNum] = useState();
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

  // Set startValues with Intl -- locale must stay English here so switch above can match
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", intlBaseOptions);
    const startValues = formatter.formatToParts(
      !!date ? new Date(date) : new Date()
    );
    setStartValues(startValues);
    setStartValuesYear(startValues[6].value);
    setStartValuesMonth(startValues[2].value);
    setStartValuesDayNum(startValues[4].value);
  }, [intlBaseOptions, date]);

  // Derive this week start and end dates to export
  useEffect(() => {
    if (startValues) {
      // Week Start Date
      let sundayDate;
      const beginOfMonthDiff = findStartOfWeek(startValues);

      // Check if start of week is in previous month
      if (beginOfMonthDiff <= 0) {
        let prevYear = null;
        let prevMonth = Number(startValuesMonth) - 1;

        // Make date adjustments if start of week is in previous year
        if (prevMonth === 0) {
          prevMonth = 12;
          prevYear = Number(startValuesYear) - 1;
        }

        const daysInPrevMonth = daysInMonth(prevMonth, Number(startValuesYear));

        sundayDate = `${prevYear || startValuesYear}-${prevMonth}-${
          daysInPrevMonth + beginOfMonthDiff
        }`;
      } else {
        sundayDate = `${startValuesYear}-${startValuesMonth}-${beginOfMonthDiff}`;
      }

      // Week End Date
      let saturdayDate;
      const endOfMonthDiff =
        findEndOfWeek(startValues) -
        daysInMonth(Number(startValuesMonth), Number(startValuesYear));

      // Check if end of week is in next month
      if (endOfMonthDiff > 0) {
        let nextYear = null;
        let nextMonth = Number(startValuesMonth) + 1;

        // Make date adjustments if end of week is in next year
        if (nextMonth === 13) {
          nextMonth = 1;
          nextYear = Number(startValuesYear) + 1;
        }

        saturdayDate = `${
          nextYear || startValuesYear
        }-${nextMonth}-${endOfMonthDiff}`;
      } else {
        saturdayDate = `${startValuesYear}-${startValuesMonth}-${findEndOfWeek(
          startValues
        )}`;
      }

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
      let dateYMD = `${startValuesYear}-${startValuesMonth}-${startValuesDayNum}`;

      let dateDMY = `${startValuesDayNum}-${startValuesMonth}-${startValuesYear}`;

      let dateMDY = `${startValuesMonth}-${startValuesDayNum}-${startValuesYear}`;

      setDates((prevDates) => {
        return {
          ...prevDates,
          dateYMD,
          dateDMY,
          dateMDY,
          monthNumeric: startValuesMonth,
          dayOfMonth: startValuesDayNum,
          year: startValuesYear,
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
    const formatted = formatter.formatToParts(
      !!date ? new Date(date) : new Date()
    );

    setDates((prevDates) => {
      return {
        ...prevDates,
        monthLong: formatted[0].value,
        weekdayLong: formatted[2].value,
      };
    });
  }, [intlMonthWeekdayLongOptions, locale, date]);

  // Set monthShort and weekdayShort values to export
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayShortOptions
    );
    const formatted = formatter.formatToParts(
      !!date ? new Date(date) : new Date()
    );

    setDates((prevDates) => {
      return {
        ...prevDates,
        monthShort: formatted[0].value,
        weekdayShort: formatted[2].value,
      };
    });
  }, [intlMonthWeekdayShortOptions, locale, date]);

  return dates;
}
