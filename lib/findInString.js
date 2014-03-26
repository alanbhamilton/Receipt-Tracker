
var _ = require('lodash');

// =============================================================
//
// Finds a date in a blob of text
//
// =============================================================

function parseMonth(string) {
  var monthTable = {
    jan: 1, feb: 2, mar: 3,
    apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9,
    oct: 10, nov: 11, dec: 12
  };
  return monthTable[string.slice(0, 3).toLowerCase()];
}

function parseYear(string) {
  var year = parseInt(string);
  if (string.length > 2) {
    return year;
  }
  if (year > 99) {
    return year;
  }
  else if (year < 80) {
    return 2000 + year;
  }
  else {
    return 1900 + year;
  }
}

var dateRegexTable = {
  mm: {
    regex: '([1-9]|0[1-9]|1[0-2])',
    varName: 'month',
    parser: parseInt
  },
  startmm: {
    regex: '(?:\\D|^)([1-9)]|0[1-9]|1[0-2])',
    varName: 'month',
    parser: parseInt
  },
  mmm: {
    regex: '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)',
    varName: 'month',
    parser: parseMonth
  },
  mmmm: {
    regex: '(january|february|march|april|may|june|july|august|september|october|november|december)',
    varName: 'month',
    parser: parseMonth
  },
  dd: {
    regex: '([1-9]|0[1-9]|1\\d|2\\d|3[0-1])',
    varName: 'day',
    parser: parseInt
  },
  startdd: {
    regex: '(?:\\D|^)([1-9)]|1\\d|2\\d|3[0-1])',
    varName: 'day',
    parser: parseInt
  },
  yy: {
    regex: '(\\d{2})',
    varName: 'year',
    parser: parseYear
  },
  yyyy: {
    regex: '(19\\d{2}|20\\d{2})',
    varName: 'year',
    parser: parseYear
  },
  multi: {
    regex: '[\\.\\/\\-\\s]'
  },
  space: {
    regex: '\\s'
  },
  commaSpace: {
    regex: '(?:\\,\\s)'
  }
};

/*
here '*' could be '.', '/', '-' or ' '

mm*dd*yyyy        06/01/1976  <- prefer MDY, run it before dd*mm*yyyy
mm*dd*yy          06/01/76    <- prefer MDY, run it before dd*mm*yy
mmm dd, yyyy      jun 1, 1976
mmm*dd*yyyy       jun/1/1976
mmm*dd*yy         jun/1/76
mmmm dd, yyyy     june 1, 1976
mmmm*dd*yy        june/1/76
dd*mm*yyyy        21/06/1976
dd*mm*yy          21/06/76
dd mmm yyyy       1 jun 1976
dd mmmm yyyy      1 june 1976
yyyy*mm*dd        1976/06/01
*/

var datePatternTable = [
  // {label: '', format: ['', '', '', '', '']},
  {label: 'mm*dd*yyyy', format: ['startmm', 'multi', 'dd', 'multi', 'yyyy']},
  {label: 'mm*dd*yy', format: ['startmm', 'multi', 'dd', 'multi', 'yy']},
  {label: 'mmm dd, yyyy', format: ['mmm', 'space', 'dd', 'commaSpace', 'yyyy']},
  {label: 'mmm*dd*yyyy', format: ['mmm', 'multi', 'dd', 'multi', 'yyyy']},
  {label: 'mmm*dd*yy', format: ['mmm', 'multi', 'dd', 'multi', 'yy']},
  {label: 'mmmm dd, yyyy', format: ['mmmm', 'space', 'dd', 'commaSpace', 'yyyy']},
  {label: 'mmmm*dd*yyyy', format: ['mmmm', 'multi', 'dd', 'multi', 'yyyy']},
  {label: 'mmmm*dd*yy', format: ['mmmm', 'multi', 'dd', 'multi', 'yy']},
  {label: 'dd*mm*yyyy', format: ['startdd', 'multi', 'mm', 'multi', 'yyyy']},
  {label: 'dd*mm*yy', format: ['startdd', 'multi', 'mm', 'multi', 'yy']},
  {label: 'dd mmm yyyy', format: ['startdd', 'space', 'mmm', 'space', 'yyyy']},
  {label: 'dd mmmm yyyy', format: ['startdd', 'space', 'mmmm', 'space', 'yyyy']},
  {label: 'yyyy*mm*dd', format: ['yyyy', 'multi', 'mm', 'multi', 'dd']}
];


function date(string) {
  string = string.replace(/ {1,}/g,' ');  // collapse multiple spaces to one
  string = string.replace(/O/g,'0');  // convert O to 0
  string = string.toLowerCase();    // we're ingoring case
  // loop through date patterns
  for (var i=0; i < datePatternTable.length; i += 1) {
    var format = [],
        regexBuild = [],
        regex,
        results,
        dateResult = {year: '', month: '', day: ''};

    format = datePatternTable[i].format.slice();  // Get a copy of the format
    // build the regex
    for (var j=0; j < format.length; j += 1) {
      regexBuild.push(dateRegexTable[format[j]].regex);
    }
    // search the string
    results = string.match(new RegExp(regexBuild.join('')));

    if (results) {
      var newDate;
      format.splice(3, 1);    // remove seperators
      format.splice(1, 1);    // remove seperators

      for (var k=0; k < format.length; k += 1) {
        var varName = dateRegexTable[format[k]].varName;
        var tableEntry = dateRegexTable[format[k]];
        // execute the parser function
        dateResult[varName] = tableEntry.parser(results[k + 1]);
      }

      dateResult.month -= 1;    // months are 0 based
      newDate = new Date(dateResult.year, dateResult.month, dateResult.day);
      if ( !(newDate instanceof Date) || !(isFinite(newDate)) ) {
        newDate = null;
      }
      return newDate;
    }
  }
  return null;    // no patterns matched
}

// =============================================================
//
// Finds the largest dollar value in a blob of text
//
// =============================================================

function total(string) {
  var regex = /(?:\$(?=\S+)|\$\ +)([0-9]{0,5})(?=(?:\.|\ )[0-9]{2})(?:\.|\ )([0-9]{2})/g,
      results = [],
      result,
      dollars,
      cents;

  while((result = regex.exec(string)) !== null) {
    dollars = result[1] ? result[1] : '0';
    cents = result[2];
    results.push(parseFloat(dollars + '.' + cents));
  }

  results = _.sortBy(results, function (num) {
    return -num;
  });
  return results[0] ? results[0] : null;
}

// =============================================================
//
// Finds the first few words in a blob of text (until a number)
// The end case (number) is the address on a receipt
//
// =============================================================

function title(string) {
  var regex = /^(.*?)(?=\d+)/;
  var result = regex.exec(string);

  if (result) {
    result = result[0].trim().toLowerCase();
  }
  return result ? result : null;
}

// =============================================================
//
// Module Exports
//
// =============================================================

module.exports.date = date;
module.exports.parseMonth = parseMonth;
module.exports.parseYear = parseYear;

module.exports.total = total;

module.exports.title = title;
