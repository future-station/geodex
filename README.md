# Geodex

A modern, zero-dependency, and tree-shakeable JavaScript library for comprehensive country, currency, and language data.

[](https://www.google.com/search?q=https://www.npmjs.com/package/geodex)
[](https://opensource.org/licenses/MIT)
[](https://www.google.com/search?q=https://github.com/future-station/geodex/actions)

-----

## Features

- **Comprehensive Data**: Access standardized information for countries, currencies, and languages.
- **Zero-Dependency**: Lightweight and won't add extra bloat to your project.
- **Fully Tree-Shakeable**: Import only the data you need, keeping your bundle size to a minimum.
- **TypeScript Native**: Written entirely in TypeScript, providing full type support out of the box.
- **Universal Compatibility**: Works in Node.js, Deno, and modern browsers via ESM, CommonJS, and UMD bundles.
- **Built-in Lookup**: Includes simple utility functions to easily find the data you need.

-----

## Installation

```bash
# Using npm
npm install geodex

# Using yarn
yarn add geodex

# Using pnpm
pnpm add geodex
```

-----

## Usage

### ES Modules (Recommended)

This is the recommended approach for modern applications, as it allows for tree-shaking.

```javascript
import { countries, currencies, lookup } from 'geodex';

// Get a specific country by its alpha-2 code
const usa = countries['US'];
console.log(usa.name); // 'United States'
console.log(usa.currencies); // ['USD']

// Get currency details
const euro = currencies['EUR'];
console.log(euro.name); // 'Euro'
console.log(euro.symbol); // '€'

// Use the lookup function to find countries
const eurozone = lookup.countries({ currency: 'EUR' });
console.log(eurozone.length); // e.g., 25
```

### Tree-Shaking for Smaller Bundles

For maximum optimization, you can import data modules directly. This is ideal for frontend projects where bundle size is critical.

```javascript
// Import only the countries data
import { countries } from 'geodex/data/countries';

// Import only the currencies data
import { currencies } from 'geodex/data/currencies';
```

### Browser Usage (via CDN)

You can use `geodex` directly in the browser via a CDN. The library will be available on the `window.geodex` object.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Geodex Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/geodex/dist/geodex.min.js"></script>
</head>
<body>
    <script>
        const symbol = window.geodex.currencies['USD'].symbol;
        console.log(symbol); // '$'

        const canada = window.geodex.countries['CA'];
        console.log(canada.name); // 'Canada'
    </script>
</body>
</html>
```

### CommonJS (Legacy Node.js)

For older Node.js projects using `require`.

```javascript
const { countries, currencies } = require('geodex');

console.log(countries['JP'].name); // 'Japan'
console.log(currencies['JPY'].symbol); // '¥'
```

-----

## API Reference

### `countries`

An object containing all countries, keyed by their `alpha2` and `alpha3` codes.

- `name`: The English name for the country (e.g., `'Germany'`).
- `alpha2`: The ISO 3166-1 alpha-2 code (e.g., `'DE'`).
- `alpha3`: The ISO 3166-1 alpha-3 code (e.g., `'DEU'`).
- `currencies`: An array of ISO 4217 currency codes (e.g., `['EUR']`).
- `languages`: An array of ISO 639-2 language codes.
- `countryCallingCodes`: An array of international call prefixes (e.g., `['+49']`).
- `ioc`: The IOC country code (e.g., `'GER'`).
- `emoji`: The country's flag emoji (e.g., '🇩🇪').
- `status`: The ISO 3166-1 assignment status (`'assigned'`, `'reserved'`, etc.).

### `currencies`

An object containing all currencies, keyed by their ISO 4217 code.

- `name`: The currency name (e.g., `'British Pound'`).
- `code`: The ISO 4217 code (e.g., `'GBP'`).
- `number`: The ISO 4217 number (e.g., `'826'`).
- `decimals`: The number of decimal digits used.
- `symbol`: The currency symbol (e.g., `'£'`).

### `languages`

An object containing all languages, keyed by their `alpha3` code.

- `name`: The English name of the language.
- `alpha2`: The ISO 639-1 code (2-letter).
- `alpha3`: The ISO 639-2 code (3-letter).
- `bibliographic`: The ISO 639-2 bibliographic code.

### `lookup`

A utility object with functions to find data.

- `lookup.countries({ key: value })`: Returns an array of countries matching the query.
- `lookup.currencies({ key: value })`: Returns an array of currencies matching the query.
- `lookup.languages({ key: value })`: Returns an array of languages matching the query.

<!-- end list -->

```javascript
import { lookup } from 'geodex';

// Find all countries that use the US Dollar
const usdCountries = lookup.countries({ currency: 'USD' });
```

-----

## Contributing

Contributions are welcome\! Please follow these steps to contribute:

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

    ```bash
    git clone https://github.com/YOUR_USERNAME/geodex.git
    ```

3. **Install** dependencies:

    ```bash
    cd geodex
    npm install
    ```

4. Create a new **branch** for your feature or fix.
5. Make your changes in the **`src`** directory.
6. **Test** your changes:

    ```bash
    npm test
    ```

7. **Commit** and **push** your changes to your fork.
8. Open a **Pull Request** on the main `geodex` repository.

-----

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
