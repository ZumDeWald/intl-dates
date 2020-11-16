# intl-dates

Easily get useful date-related information using JavaScript Intl.

### Description

This package provides a quick and easy way to work with dates by returning an object containing commonly used, date-related data. It can also be passed an [options object](#options) to further customize the way the date information comes back. <br />

This package exports both a Vanilla JavaScript function (`intlDates`) and a custom React hook (`useIntlDates`), each of which return an object (`dates`) containing the same key/value pairs.

### Sections:

1. [Installation](#installation)
2. [Date Information](#date-information)
3. [Dependencies](#dependencies)
4. [Options](#options)
5. [Examples](#examples)
6. [Feature List](#feature-list)
7. [Why offer VanillaJS _and_ hook options?](#why-offer-vanillajs-and-hook-options)

## Installation

- This npm package can be installed by running `npm install intl-dates --save-dev`
- See [Date Information](#date-information) for more info on what data is returned
- See [Examples](#examples) further down to see how the package would be brought into your project

## Date Information

Both the `intlDates` function and `useIntlDates` hook return an object named `dates` with various date-related information allowing you to simply grab it and arrange it as you need. ([see example further down](#examples))<br /> <br />
The `dates` object returned contains the following key/value pairs:

- `dateDMY`: <br /> &nbsp; String containing the current date in the following format: "DD-MM-YYYY"

- `dateMDY`: <br /> &nbsp; String containing the current date in the following format: "MM-DD-YYYY"

- `dateYMD`: <br /> &nbsp; String containing the current date in the following format: "YYYY-MM-DD"

- `dayOfMonth`: <br /> &nbsp; String containing the day of the month in numeric form, e.g. "24"

- `monthLong`: <br /> &nbsp;String containing the month expressed as it's full name, e.g. "October"

- `monthNumeric`: <br /> &nbsp; String containing the month expressed in numeric form, e.g. "10"

- `monthShort`: <br /> &nbsp; String containing the month expressed as a short name, e.g. "Oct"

- `weekEndDate`: ([see use case further down](#date-ranges)) <br /> &nbsp; String containing the full date of the Saturday of the current week in the following format: "YYYY-MM-DD"

- `weekStartDate`: ([see use case further down](#date-ranges)) <br /> &nbsp; String containing the full date of the Sunday of the current week in the following format: "YYYY-MM-DD"

- `weekdayLong`: <br /> &nbsp; String containing the full name of the current weekday, e.g. "Saturday"

- `weekdayShort`: <br /> &nbsp; String containing the short name of the current weekday, e.g. "Sat"

- `year`: <br /> &nbsp; String containing the year expressed in numeric form, e.g. "2020"

## Dependencies

Great news! This code uses the power of the [JavaScript Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). _No outside libraries or code_ is needed by this package, so no alerts that a dependency of a dependency has a security issue!<br />

### There are only 2 things to be aware of if using this package:

1.  The `useIntlDates` custom hook will only run in a React app v16.8.0 and up (React with support for hooks) and must be called in a functional component (not class-based) in accordance with the [React docs](https://reactjs.org/docs/hooks-intro.html).

2.  For either `intlDates` or `useIntlDates` to work the browser must support [**Intl.DateTimeFormat.formatToParts**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts). Check [caniuse.com](https://caniuse.com/?search=Intl%3A%20DateTimeFormat%3A%20formatToParts) to make sure your target browsers are supported (_92.77% Global support at time of writing_)

## Options

Both `intlDates` and `useIntlDates` will accept an object of these options ([see usage below](#specify-locale)):

1. `locale` [_optional_]

   - default: "default" &nbsp; [_defaults to the locale identified by the browser_]<br />
   - This option allows you to get date information back in a specific language. <br />
   - Any valid locale acceptable to [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) will work.<br />
   - Examples: "en-US", "da-DK", "de", "es"

<br />

2. `date` [_optional_]

   - default: today's date <br />
   - This option allows you to get back date information based on a specific date. <br />
   - Any value accepted by the JavaScript [Date()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Parameters) constructor will work. <br />
   - Examples: "2020-10-24T14:48:00", "10/24/2020", "October 24, 2020"

## Examples

The only difference in usage between `intlDates` and `useIntlDates` is the context in which they are brought into your project. The examples below offer a look into how to import/use this package in both environments for clarity.

#### Common Use

Get date-related info and format it as you need. Consider the following if today was _Saturday, October 24, 2020_.<br />

###### Using `intlDates` function

```
import { intlDates } from 'intl-dates'; // Bring the function into your code as a named export

// Retrieve and destructure the 'dates' object from the intlDates function
const dates = intlDates();

...

  <div>
  `Today is ${dates.weekdayLong} ${dates.monthShort} ${dates.dayOfMonth}, ${dates.year}`
  </div>

...

// Would result in "Today is Saturday, Oct 24, 2020"

```

###### Using `useIntlDates` custom hook

```
import useIntlDates from 'intl-dates'; // Bring the hook into your component

const MyComponent = () => {

  // Retrieve and destructure the 'dates' object from the useIntlDates hook
  const dates = useIntlDates();

  return(
    <div>
    `Today is ${dates.weekdayLong} ${dates.monthShort} ${dates.dayOfMonth}, ${dates.year}`
    </div>
  )
}

// Would return "Today is Saturday, Oct 24, 2020"

```

<br />

#### Specify Date

Return date information based on a specific date. Consider if you wanted to get information based on _Monday, February 15, 1999_.<br />

###### Using `intlDates` function

```
import { intlDates } from 'intl-dates'; // Bring the function into your code as a named export

// Retrieve and destructure the 'dates' object from the intlDates function
const dates = intlDates({
  date: "2/15/1999"  // Specify a date in options object
  });

...

  <div>
  `Today is ${dates.weekdayLong} ${dates.monthShort} ${dates.dayOfMonth}, ${dates.year}`
  </div>

...

// Would result in "Today is Monday, Feb 15, 1999"

```

###### Using `useIntlDates` custom hook

```
import useIntlDates from 'intl-dates'; // Bring the hook into your component

const MyComponent = () => {

  // Retrieve and destructure the 'dates' object from the useIntlDates hook
  const dates = useIntlDates({
    date: "2/15/1999"  // Specify a date in options object
    });

  return(
    <div>
    `Today is ${dates.weekdayLong} ${dates.monthShort} ${dates.dayOfMonth}, ${dates.year}`
    </div>
  )
}

// Would return "Today is Monday, Feb 15, 1999"

```

<br />

#### Specify Locale

Passing in a specific locale through the options object will return the data in a specific language. Consider the following if you wanted to be sure the day of the week and month returned in Danish.

> Note: the default locale is set to 'default', which allows the browser to choose which locale is used.

###### Using `intlDates` function

```
import { intlDates } from 'intl-dates'; // Bring the function into your code as a named export

// Retrieve and destructure the 'dates' object from the intlDates function
const dates = intlDates({
  locale: "da-DK"  // Set the locale to return in Danish
});

...

  <div>
  `I dag er ${dates.weekdayLong} den ${dates.dayOfMonth}. ${dates.monthShort} ${dates.year}`
  </div>

...

// Would result in "I dag er lørdag den 24. okt 2020"

```

###### Using `useIntlDates` custom hook

```
import useIntlDates from 'intl-dates'; // Bring the hook into your component

const MyComponent = () => {

  // Retrieve and destructure the 'dates' object from the useIntlDates hook
  const dates = useIntlDates({
    locale: "da-DK"  // Set the locale to return in Danish
  });

  return(
    <div>
    `I dag er ${dates.weekdayLong} den ${dates.dayOfMonth}. ${dates.monthShort} ${dates.year}`
    </div>
  )
}

// Would return "I dag er lørdag den 24. okt 2020"

```

<br />

#### Date Ranges

Say you need the date for the first and last day of the week (Sunday and Saturday) to request a range of data from an API for the week. <br /> <br />
The following would make the request with the date for Sunday coming from `dates.weekStartDate` and the date for Saturday from `dates.weekEndDate` in the format 'YYYY-MM-DD': <br />

> Note: Dates are based on the _current_ week if no date is passed as an option, else the dates are based on the week in which the specified date falls.

###### Using `intlDates` function

```
import { intlDates } from 'intl-dates'; // Bring the function into your code as a named export

// Retrieve and destructure the 'dates' object from the intlDates function
const dates = intlDates();

fetch(`[urlToYourAPI]/getByDateRange?startDate=${dates.weekStartDate}&endDate=${dates.weekEndDate}`)


  // Use the returned data

```

###### Using `useIntlDates` custom hook

```
    import React, { useEffect } from 'react';
    import useIntlDates from 'intl-dates'; // Bring the hook into your component

    const MyComponent = () => {

      // Retrieve and destructure the 'dates' object from the useIntlDates hook
      const dates = useIntlDates();

      useEffect(() => {
        fetch(`[urlToYourAPI]/getByDateRange?startDate=${dates.weekStartDate}&endDate=${dates.weekEndDate}`)
      }, [dates])

      return(

      // Use the returned data

      )

    }
```

## Feature List

This list includes current and planned features. Check the issues page for a more exhaustive look at what features are being added and where they stand in the development process.

- [x] No dependencies, simply JavaScript code
- [x] This package offers a VanillaJS and custom React hook option
- [x] Options object accepts `locale` property to specify a locale/language for Intl to use
- [x] Options object will allow a `date` property to get back data based on a specific date instead of only from the current day.

## Why offer VanillaJS and hook options?

The functionality in this package is very simple and could easily be exported only as a plain (vanilla) JavaScript function and be used in any project, including React. However, having the logic wired up as a custom React hook makes it conform more to React principles and best practices as it uses the `useState` and `useEffect` hooks internally, allowing the data to re-run only when needed (example: if you are dynamically feeding the options object and that information changes).
