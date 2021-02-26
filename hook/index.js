import { useEffect, useState } from "react";

export default function useIntlDates({ locale = "default", date = null } = {}) {
  const [intlBaseOptions] = useState({
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const [intlMonthWeekdayLongOptions] = useState({
    weekday: "long",
    month: "long",
  });

  const [intlMonthWeekdayShortOptions] = useState({
    weekday: "short",
    month: "short",
  });

  const [weekdayEng, setWeekdayEng] = useState();
  const [monthNumeric, setMonthNumeric] = useState();
  const [dayOfMonth, setDayOfMonth] = useState();
  const [year, setYear] = useState();
  const [dates, setDates] = useState({});

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

  // Set startValues with Intl -- locale must stay English here so switch above can match
  useEffect(() => {
    const startValues = new Intl.DateTimeFormat(
      "en-US",
      intlBaseOptions
    ).formatToParts(!!date ? new Date(date) : new Date());

    const assignInitialValues = (objFromIntlArray) => {
      switch (objFromIntlArray.type) {
        case "literal":
          break;
        case "weekday":
          return setWeekdayEng(objFromIntlArray.value);
        case "month":
          return setMonthNumeric(objFromIntlArray.value);
        case "day":
          setDayOfMonth(objFromIntlArray.value);
          setDates((prevDates) => {
            return {
              ...prevDates,
              dayOfMonth: objFromIntlArray.value,
            };
          });
          break;
        case "year":
          setYear(objFromIntlArray.value);
          setDates((prevDates) => {
            return {
              ...prevDates,
              year: objFromIntlArray.value,
            };
          });
          break;
        default:
          break;
      }
    };

    startValues.forEach((item) => {
      assignInitialValues(item);
    });
  }, [intlBaseOptions, date]);

  // === Derive this week start and end dates to export === //
  useEffect(() => {
    if (!!weekdayEng && !!dayOfMonth) {
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

      setDates((prevDates) => {
        return {
          ...prevDates,
          weekStartDate,
          weekEndDate,
        };
      });
    }
  }, [weekdayEng, dayOfMonth]);

  // Set year/month/date values to export
  useEffect(() => {
    if (!!monthNumeric && !!year && !!dayOfMonth) {
      let dateYMD = `${year}-${monthNumeric}-${dayOfMonth}`;

      let dateDMY = `${dayOfMonth}-${monthNumeric}-${year}`;

      let dateMDY = `${monthNumeric}-${dayOfMonth}-${year}`;

      setDates((prevDates) => {
        return {
          ...prevDates,
          dateYMD,
          dateDMY,
          dateMDY,
        };
      });
    }
  }, [monthNumeric, dayOfMonth, year]);

  // Set weekdayLong monthLong values to export
  useEffect(() => {
    const formatted = new Intl.DateTimeFormat(
      locale,
      intlMonthWeekdayLongOptions
    ).formatToParts(!!date ? new Date(date) : new Date());

    let weekdayLong;
    let monthLong;

    const assignLongValues = (objFromIntlArray) => {
      switch (objFromIntlArray.type) {
        case "literal":
          break;
        case "weekday":
          return (weekdayLong = objFromIntlArray.value);
        case "month":
          return (monthLong = objFromIntlArray.value);
        default:
          break;
      }
    };

    formatted.forEach((item) => {
      assignLongValues(item);
    });

    setDates((prevDates) => {
      return {
        ...prevDates,
        weekdayLong,
        monthLong,
      };
    });
  }, [intlMonthWeekdayLongOptions, locale, date]);

  // Set weekdayShort monthShort values to export
  useEffect(() => {
    const formatted = new Intl.DateTimeFormat(
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
        default:
          break;
      }
    };

    formatted.forEach((item) => {
      assignShortValues(item);
    });

    setDates((prevDates) => {
      return {
        ...prevDates,
        weekdayShort,
        monthShort,
      };
    });
  }, [intlMonthWeekdayShortOptions, locale, date]);

  return dates;
}
