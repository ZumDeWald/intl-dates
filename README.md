# useIntlDates

This package provides a quick and easy way to work with dates in the form of returning an object containing commonly used, helpful date related data. It can also be passed an [options object](#options) containing a specified locale to bring back language specific data. Currently the package exports a custom React hook that returns an object with helpful date related data.

## What can I get out of this package

This hook returns an object with various date related information allowing you to simply grab it and arrange it as you need.<br>
The object returned by this React hook contains the following ket/value pairs:

- dateDMY: (String containing the current date in the following format: "DD-MM-YYYY")
- dateMDY: (String containing the current date in the following format: "MM-DD-YYYY")
- dateYMD: (String containing the current date in the following format: "YYYY-MM-DD")
- dayOfMonth: (String containing the day of the month in numeric form, e.g. "24")
- monthLong: (String containing the month expressed as it's full name, e.g. "October")
- monthNumeric: (String containing the month expressed in numeric form, e.g. "10")
- monthShort: (String containing the month expressed as a short name, e.g. "Oct")
- weekEndDate: (String containing the full date of the Saturday of the current week in the following format: "YYYY-MM-DD")
- weekStartDate: (String containing the full date of the Sunday of the current week in the following format: "YYYY-MM-DD")
- weekdayLong: (String containing the full name of the current weekday, e.g. "Saturday")
- weekdayShort: (String containing the short name of the current weekday, e.g. "Sat")
- year: (String containing the year expressed in numeric form, e.g. "2020")

## Dependencies

Great news! This code uses the power of the [JavaScript Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) to derive date related data. _No outside libraries or code_ is needed by this package, so no alerts that a dependency of a dependency has a security issue!<br>

### There are only 2 requirements for using this hook:

1. **React**: The hook will only run in a React app v16.8.0 and up (React with support for hooks) and must be called in a functional component (not class based) in accordance with the [React docs](https://reactjs.org/docs/hooks-intro.html).
2. The browser must support **Intl.DateTimeFormat.formatToParts**. Check [caniuse.com](https://caniuse.com/?search=Intl%3A%20DateTimeFormat%3A%20formatToParts) to make sure your target browsers are supported (_92.77% at time of writing_)

## Options

This hook will accept an object of these options (see further down for example):

- locale [_optional_]<br>
  -- default: "default" [_defaults to the locale identified by the browser_]<br>
  -- This option allows you to pass a specific locale to the call to the Intl constructor used inside the hook. Any valid [locale acceptable to Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) will work.<br>
  -- Examples: "en-US", "da-DK", "de", "es"
