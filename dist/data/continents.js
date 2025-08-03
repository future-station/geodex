"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var regions = _interopRequireWildcard(require("./regions.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var asia = {
  name: 'Asia',
  regions: ['centralAsia', 'southernAsia', 'southeastAsia', 'eastAsia', 'westernAsia'],
  countries: [regions.centralAsia.countries, regions.southernAsia.countries, regions.southeastAsia.countries, regions.eastAsia.countries, regions.westernAsia.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var africa = {
  name: 'Africa',
  regions: ['centralAfrica', 'northAfrica', 'southernAfrica', 'eastAfrica', 'westAfrica'],
  countries: [regions.centralAfrica.countries, regions.northAfrica.countries, regions.southernAfrica.countries, regions.eastAfrica.countries, regions.westAfrica.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var northAmerica = {
  name: 'North America',
  regions: ['centralAmerica', 'northernAmerica', 'caribbean'],
  countries: [regions.centralAmerica.countries, regions.northernAmerica.countries, regions.caribbean.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var southAmerica = {
  name: 'South America',
  regions: ['southAmerica'],
  countries: [regions.southAmerica.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var antartica = {
  name: 'Antartica',
  regions: ['antartica'],
  countries: [regions.antartica.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var europe = {
  name: 'Europe',
  regions: ['northernEurope', 'southernEurope', 'easternEurope', 'westernEurope'],
  countries: [regions.northernEurope.countries, regions.southernEurope.countries, regions.easternEurope.countries, regions.westernEurope.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var oceania = {
  name: 'Oceania',
  regions: ['australia', 'melanesia', 'micronesia', 'polynesia'],
  countries: [regions.australia.countries, regions.melanesia.countries, regions.micronesia.countries, regions.polynesia.countries].reduce(function (a, b) {
    return a.concat(b);
  }, []).sort()
};
var _default = exports["default"] = {
  asia: asia,
  africa: africa,
  northAmerica: northAmerica,
  southAmerica: southAmerica,
  antartica: antartica,
  europe: europe,
  oceania: oceania
};