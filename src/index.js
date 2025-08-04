import {
  currencySymbolMap,
  getSymbolFromCurrency,
  getNameFromCurrency,
  getSafeSymbolFromCurrency,
  getSafeNameFromCurrency,
} from './data/currency-symbol';

import continents from './data/continents';
import * as regions from './data/regions';
import countriesAll from './data/countries';
import currenciesAll from './data/currencies';
import languagesAll from './data/languages';
import timezonesAll from './data/timezones';
import lookupFn from './lookup';

const countries = {
  all: countriesAll,
};

countriesAll.forEach((country) => {
  //   prefer assigned country codes over inactive ones
  const { status } = countries[country.alpha2] || {};
  if (!status || status === 'deleted') {
    countries[country.alpha2] = country;
  }

  const { status: statusAlpha3 } = countries[country.alpha3] || {};
  if (!statusAlpha3 || statusAlpha3 === 'deleted') {
    countries[country.alpha3] = country;
  }
});

const currencies = {
  all: currenciesAll,
};

currenciesAll.forEach((currency) => {
  //  If the symbol isn't available, default to the currency code

  let symbolCode = getSymbolFromCurrency(currency.code);
  if (symbolCode === '?') {
    symbolCode = currency.code;
  }

  const newCurrency = Object.assign(currency, { symbol: symbolCode });
  currencies[currency.code] = newCurrency;
});

const languages = {
  all: languagesAll,
};

//   Note that for the languages there are several entries with the same alpha3 -
//   eg Dutch and Flemish. Not sure how to best deal with that - here whichever
//   comes last wins.
languagesAll.forEach((language) => {
  languages[language.alpha2] = language;
  languages[language.bibliographic] = language;
  languages[language.alpha3] = language;
});

// Create a flat array of all unique timezones
const allTimezones = Array.from(
  new Set(Object.values(timezonesAll).flat())
).sort();

const timezones = {
  all: allTimezones,
  byCountry: timezonesAll,

  getTimezonesByCountry: (countryCode) => {
    // Handle both uppercase and lowercase country codes
    const normalizedCode = countryCode ? countryCode.toUpperCase() : '';
    return timezonesAll[normalizedCode] || null;
  },

  getCountriesForTimezone: (timezone) => {
    return Object.keys(timezonesAll).filter((countryCode) =>
      timezonesAll[countryCode].includes(timezone)
    );
  },

  getUtcOffset: (timezone) => {
    if (!timezone || typeof timezone !== 'string') {
      return null;
    }

    try {
      // Use Intl API to get the UTC offset for the timezone
      const now = new Date();
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const targetTime = new Date(
        utc.toLocaleString('en-US', { timeZone: timezone })
      );
      const offsetMs = targetTime.getTime() - utc.getTime();
      const offsetHours = Math.floor(offsetMs / (1000 * 60 * 60));
      const offsetMinutes = Math.floor(
        (Math.abs(offsetMs) % (1000 * 60 * 60)) / (1000 * 60)
      );

      const sign = offsetMs >= 0 ? '+' : '-';
      const hours = Math.abs(offsetHours).toString().padStart(2, '0');
      const minutes = offsetMinutes.toString().padStart(2, '0');

      return minutes === '00'
        ? `${sign}${hours}`
        : `${sign}${hours}:${minutes}`;
    } catch {
      // Invalid timezone
      return null;
    }
  },
};

// Add country code mappings for backward compatibility
Object.keys(timezonesAll).forEach((countryCode) => {
  timezones[countryCode] = timezonesAll[countryCode];
});

const lookup = lookupFn({
  countries: countriesAll,
  currencies: currenciesAll,
  languages: languagesAll,
  timezones: timezonesAll,
});

const callingCountries = { all: [] };

const callingCodesAll = countriesAll.reduce((codes, country) => {
  const { countryCallingCodes, alpha2, alpha3 } = country;
  if (countryCallingCodes && countryCallingCodes.length) {
    callingCountries.all.push(country);

    callingCountries[alpha2] = country;
    callingCountries[alpha3] = country;

    countryCallingCodes.forEach((code) => {
      if (codes.indexOf(code) === -1) {
        codes.push(code);
      }
    });
  }
  return codes;
}, []);

delete callingCountries['']; //   remove empty alpha3s

callingCodesAll.sort((a, b) => {
  const parse = (str) => +str;
  const splitA = a.split(' ').map(parse);
  const splitB = b.split(' ').map(parse);

  if (splitA[0] < splitB[0]) {
    return -1;
  }
  if (splitA[0] > splitB[0]) {
    return 1;
  }
  //   Same - check split[1]
  if (splitA[1] === undefined && splitB[1] !== undefined) {
    return -1;
  }
  if (splitA[1] !== undefined && splitB[1] === undefined) {
    return 1;
  }
  if (splitA[1] < splitB[1]) {
    return -1;
  }
  if (splitA[1] > splitB[1]) {
    return 1;
  }
  return 0;
});

const callingCodes = {
  all: callingCodesAll,
};

export {
  continents,
  regions,
  countries,
  currencies,
  languages,
  timezones,
  lookup,
  callingCountries,
  callingCodes,
  currencySymbolMap,
  getSymbolFromCurrency,
  getNameFromCurrency,
  getSafeSymbolFromCurrency,
  getSafeNameFromCurrency,
};
