"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callingCountries = exports.callingCodes = void 0;
Object.defineProperty(exports, "continents", {
  enumerable: true,
  get: function get() {
    return _continents["default"];
  }
});
exports.currencies = exports.countries = void 0;
Object.defineProperty(exports, "currencySymbolMap", {
  enumerable: true,
  get: function get() {
    return _currencySymbol.currencySymbolMap;
  }
});
Object.defineProperty(exports, "getNameFromCurrency", {
  enumerable: true,
  get: function get() {
    return _currencySymbol.getNameFromCurrency;
  }
});
Object.defineProperty(exports, "getSafeNameFromCurrency", {
  enumerable: true,
  get: function get() {
    return _currencySymbol.getSafeNameFromCurrency;
  }
});
Object.defineProperty(exports, "getSafeSymbolFromCurrency", {
  enumerable: true,
  get: function get() {
    return _currencySymbol.getSafeSymbolFromCurrency;
  }
});
Object.defineProperty(exports, "getSymbolFromCurrency", {
  enumerable: true,
  get: function get() {
    return _currencySymbol.getSymbolFromCurrency;
  }
});
exports.timezones = exports.regions = exports.lookup = exports.languages = void 0;
var _currencySymbol = require("./data/currency-symbol");
var _continents = _interopRequireDefault(require("./data/continents"));
var regions = _interopRequireWildcard(require("./data/regions"));
exports.regions = regions;
var _countries = _interopRequireDefault(require("./data/countries"));
var _currencies = _interopRequireDefault(require("./data/currencies"));
var _languages = _interopRequireDefault(require("./data/languages"));
var _timezones = _interopRequireDefault(require("./data/timezones"));
var _lookup = _interopRequireDefault(require("./lookup"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var countries = exports.countries = {
  all: _countries["default"]
};
_countries["default"].forEach(function (country) {
  //   prefer assigned country codes over inactive ones
  var _ref = countries[country.alpha2] || {},
    status = _ref.status;
  if (!status || status === 'deleted') {
    countries[country.alpha2] = country;
  }
  var _ref2 = countries[country.alpha3] || {},
    statusAlpha3 = _ref2.status;
  if (!statusAlpha3 || statusAlpha3 === 'deleted') {
    countries[country.alpha3] = country;
  }
});
var currencies = exports.currencies = {
  all: _currencies["default"]
};
_currencies["default"].forEach(function (currency) {
  //  If the symbol isn't available, default to the currency code

  var symbolCode = (0, _currencySymbol.getSymbolFromCurrency)(currency.code);
  if (symbolCode === '?') {
    symbolCode = currency.code;
  }
  var newCurrency = Object.assign(currency, {
    symbol: symbolCode
  });
  currencies[currency.code] = newCurrency;
});
var languages = exports.languages = {
  all: _languages["default"]
};

//   Note that for the languages there are several entries with the same alpha3 -
//   eg Dutch and Flemish. Not sure how to best deal with that - here whichever
//   comes last wins.
_languages["default"].forEach(function (language) {
  languages[language.alpha2] = language;
  languages[language.bibliographic] = language;
  languages[language.alpha3] = language;
});

// Create a flat array of all unique timezones
var allTimezones = Array.from(new Set(Object.values(_timezones["default"]).flat())).sort();
var timezones = exports.timezones = {
  all: allTimezones,
  byCountry: _timezones["default"],
  getTimezonesByCountry: function getTimezonesByCountry(countryCode) {
    // Handle both uppercase and lowercase country codes
    var normalizedCode = countryCode ? countryCode.toUpperCase() : '';
    return _timezones["default"][normalizedCode] || null;
  },
  getCountriesForTimezone: function getCountriesForTimezone(timezone) {
    return Object.keys(_timezones["default"]).filter(function (countryCode) {
      return _timezones["default"][countryCode].includes(timezone);
    });
  },
  getUtcOffset: function getUtcOffset(timezone) {
    if (!timezone || typeof timezone !== 'string') {
      return null;
    }
    try {
      // Use Intl API to get the UTC offset for the timezone
      var now = new Date();
      var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      var targetTime = new Date(utc.toLocaleString('en-US', {
        timeZone: timezone
      }));
      var offsetMs = targetTime.getTime() - utc.getTime();
      var offsetHours = Math.floor(offsetMs / (1000 * 60 * 60));
      var offsetMinutes = Math.floor(Math.abs(offsetMs) % (1000 * 60 * 60) / (1000 * 60));
      var sign = offsetMs >= 0 ? '+' : '-';
      var hours = Math.abs(offsetHours).toString().padStart(2, '0');
      var minutes = offsetMinutes.toString().padStart(2, '0');
      return minutes === '00' ? "".concat(sign).concat(hours) : "".concat(sign).concat(hours, ":").concat(minutes);
    } catch (_unused) {
      // Invalid timezone
      return null;
    }
  }
};

// Add country code mappings for backward compatibility
Object.keys(_timezones["default"]).forEach(function (countryCode) {
  timezones[countryCode] = _timezones["default"][countryCode];
});
var lookup = exports.lookup = (0, _lookup["default"])({
  countries: _countries["default"],
  currencies: _currencies["default"],
  languages: _languages["default"],
  timezones: _timezones["default"]
});
var callingCountries = exports.callingCountries = {
  all: []
};
var callingCodesAll = _countries["default"].reduce(function (codes, country) {
  var countryCallingCodes = country.countryCallingCodes,
    alpha2 = country.alpha2,
    alpha3 = country.alpha3;
  if (countryCallingCodes && countryCallingCodes.length) {
    callingCountries.all.push(country);
    callingCountries[alpha2] = country;
    callingCountries[alpha3] = country;
    countryCallingCodes.forEach(function (code) {
      if (codes.indexOf(code) === -1) {
        codes.push(code);
      }
    });
  }
  return codes;
}, []);
delete callingCountries['']; //   remove empty alpha3s

callingCodesAll.sort(function (a, b) {
  var parse = function parse(str) {
    return +str;
  };
  var splitA = a.split(' ').map(parse);
  var splitB = b.split(' ').map(parse);
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
var callingCodes = exports.callingCodes = {
  all: callingCodesAll
};