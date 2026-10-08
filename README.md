# Weather Dashboard

A JavaScript weather dashboard by Mahmoud Majed. Search for a city to see its current temperature, conditions, icon, feels-like temperature, humidity and wind speed.

## Setup

1. Create an account at https://home.openweathermap.org/users/sign_up.
2. Open https://home.openweathermap.org/api_keys and copy your API key for the Current Weather API. A new key may need time to activate.
3. Copy `config.example.json` to `config.json` if that file is missing.
4. In `config.json`, replace `YOUR_API_KEY_HERE` with your key, keeping the quotation marks.
5. Open the project folder in VS Code and run `index.html` with the Live Server extension. Use a local web server, rather than double-clicking the HTML file, because the app fetches its configuration file.
6. Search for a city such as Beirut. You can add a country code, for example `Paris,FR`.

No build step or npm installation is needed.

## API key

`config.json` and `.env` files are ignored by Git. Only the example placeholder should be committed. A plain browser app sends its key in browser requests; this approach prevents committing the key to GitHub, but does not conceal it from someone inspecting the browser. Each person cloning the repository should create their own local configuration.

## Files

- `index.html`: search form and weather display.
- `style.css`: desktop and mobile layout.
- `script.js`: DOM events, async/await, Fetch API, JSON rendering and error handling.
- `config.example.json`: configuration template without a real key.

## Checks

- Search Beirut: live data and an icon should appear.
- Submit an empty input: an input error should appear.
- Search a nonexistent city: a city-not-found error should appear.
- Disconnect the internet and search: a connection error should appear.
- Search while throttling the network: the loading message should stay visible until the request ends.
- Try a phone-width window: the search controls and weather details should stack.


