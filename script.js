const form = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-button');
const loading = document.querySelector('#loading');
const errorMessage = document.querySelector('#error');
const weatherSection = document.querySelector('#weather');

function showWeather(data) {
  document.querySelector('#city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector('#temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector('#description').textContent = data.weather[0].description;
  document.querySelector('#feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
  document.querySelector('#humidity').textContent = `${data.main.humidity}%`;
  document.querySelector('#wind').textContent = `${data.wind.speed} m/s`;

  const icon = document.querySelector('#weather-icon');
  icon.alt = data.weather[0].description;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherSection.hidden = false;
}

async function getWeather(city) {
  loading.hidden = false;
  searchButton.disabled = true;
  cityInput.disabled = true;
  form.setAttribute('aria-busy', 'true');

  try {
    // The real key stays in an ignored local file.
    const configResponse = await fetch('config.json');
    if (!configResponse.ok) {
      throw new Error('Copy config.example.json to config.json and add your API key.');
    }
    const config = await configResponse.json();
    if (!config.apiKey || config.apiKey === 'YOUR_API_KEY_HERE') {
      throw new Error('Add your OpenWeatherMap API key to config.json first.');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(config.apiKey)}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Check the spelling and try again.');
      }
      if (response.status === 401) {
        throw new Error('The API key is invalid or not active yet. Check your OpenWeatherMap account.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a little and try again.');
      }
      throw new Error('The weather service is unavailable. Please try again later.');
    }

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    if (error instanceof TypeError) {
      errorMessage.textContent = 'Could not connect. Check your internet connection and try again.';
    } else if (error instanceof SyntaxError) {
      errorMessage.textContent = 'Could not read the data. Check config.json and try again.';
    } else {
      errorMessage.textContent = error.message;
    }
    weatherSection.hidden = true;
    errorMessage.hidden = false;
  } finally {
    loading.hidden = true;
    searchButton.disabled = false;
    cityInput.disabled = false;
    form.setAttribute('aria-busy', 'false');
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  errorMessage.hidden = true;
  weatherSection.hidden = true;
  const city = cityInput.value.trim();

  if (city === '') {
    errorMessage.textContent = 'Please enter a city name.';
    errorMessage.hidden = false;
    return;
  }

  getWeather(city);
});
