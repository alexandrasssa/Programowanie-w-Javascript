const apiKey = '908268816a7fa9a0061f7c8395e47ea5';

async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

function displayWeather(data) {
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const weatherDescription = data.weather[0].description;
  let weatherIcon;

  if (weatherDescription.includes('cloud')) {
    weatherIcon = '☁️';
  } else if (weatherDescription.includes('sun') || weatherDescription.includes('clear')) {
    weatherIcon = '☀️';
  } else if (weatherDescription.includes('rain')) {
    weatherIcon = '🌧️';
  } else if (weatherDescription.includes('snow')) {
    weatherIcon = '❄️';
  } else {
    weatherIcon = '🌫️';
  }

  const weatherElement = document.getElementById('weather');
  weatherElement.innerHTML = `
    <p>Temperatura: ${temperature} °C</p>
    <p>Wilgotność: ${humidity} %</p>
    <p>Pogoda: ${weatherIcon} ${weatherDescription}</p>
  `;
}

const form = document.querySelector('form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const data = await getWeather(city);
  displayWeather(data);
});
function displayWeather(data, city) {
    // ...
    
    localStorage.setItem('city', city);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const city = localStorage.getItem('city');
    if (city) {
      document.getElementById('city').value = city;
      getWeather(city).then(data => displayWeather(data, city));
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    // ...
  
    const favoritesList = document.getElementById('favorites');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    function renderFavorites() {
      favoritesList.innerHTML = '';
      favorites.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        favoritesList.appendChild(li);
      });
    }
  
    renderFavorites();
  
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const city = document.getElementById('city').value;
      const data = await getWeather(city);
      displayWeather(data, city);
      if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
    });
  
    const newCityForm = document.getElementById('newCity').parentElement;
    newCityForm.addEventListener('submit', event => {
      event.preventDefault();
      const newCity = document.getElementById('newCity').value;
      if (!favorites.includes(newCity)) {
        favorites.push(newCity);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
      document.getElementById('newCity').value = '';
    });
  
    favoritesList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        const city = event.target.textContent;
        const index = favorites.indexOf(city);
        if (index !== -1) {
          favorites.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          renderFavorites();
        }
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    // ...
  
    const favoritesList = document.getElementById('favorites');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
    function renderFavorites() {
      favoritesList.innerHTML = '';
      favorites.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        favoritesList.appendChild(li);
      });
    }
  
    renderFavorites();
  
    async function updateWeather(city) {
      const data = await getWeather(city);
      displayWeather(data, city);
    }
  
    async function updateFavoritesWeather() {
      favorites.forEach(city => {
        updateWeather(city);
      });
    }
  
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const city = document.getElementById('city').value;
      const data = await getWeather(city);
      displayWeather(data, city);
      if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
    });
  
    const newCityForm = document.getElementById('newCity').parentElement;
    newCityForm.addEventListener('submit', event => {
      event.preventDefault();
      const newCity = document.getElementById('newCity').value;
      if (!favorites.includes(newCity)) {
        favorites.push(newCity);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
      document.getElementById('newCity').value = '';
    });
  
    favoritesList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        const city = event.target.textContent;
        const index = favorites.indexOf(city);
        if (index !== -1) {
          favorites.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          renderFavorites();
        }
      }
    });
  
    setInterval(() => {
      updateFavoritesWeather();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  });