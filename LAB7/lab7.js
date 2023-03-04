const apiKey = '908268816a7fa9a0061f7c8395e47ea5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

let locations = JSON.parse(localStorage.getItem('locations')) || [];

const container = document.getElementById('weather-container');
const form = document.querySelector('.add-location-form');
const input = document.getElementById('location');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = input.value.trim();

	if (location === '') {
		alert('Please enter a city name');
		return;
	}

	addLocation(location);
	input.value = '';
});

function addLocation(location) {
	if (locations.includes(location)) {
		alert('This location is already added');
		return;
	}

	locations.push(location);
	localStorage.setItem('locations', JSON.stringify(locations));

	getWeather(location);
}

function removeLocation(location) {
	const index = locations.indexOf(location);

	if (index !== -1) {
		locations.splice(index, 1);
		localStorage.setItem('locations', JSON.stringify(locations));
	}

	const locationElement = document.getElementById(location);
	container.removeChild(locationElement);
}

function getWeather(location) {
	fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
		.then(response => response.json())
		.then(data => {
			const weather = {
				temp: data.main.temp,
				humidity: data.main.humidity,
				icon: data.weather[0].icon,
				description: data.weather[0].description
			};

			displayWeather(location, weather);
		})
		.catch(() => {
			alert('Could not fetch weather data');
			removeLocation(location);
		});
}

function displayWeather(location, weather) {
	const locationElement = document.createElement('div');
	locationElement.classList.add('location');
	locationElement.id = location;

	const titleElement = document.createElement('h2');
	titleElement.textContent = location;

	const tempElement = document.createElement('p');
	tempElement.innerHTML = `Temperature: ${weather.temp}°C`;

	const humidityElement = document.createElement('p');
	humidityElement.textContent = `Humidity: ${weather.humidity}%`;

	const iconElement = document.createElement('img');
	iconElement.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
	iconElement.alt = weather.description;

	locationElement.appendChild(titleElement);
	locationElement.appendChild(tempElement);
	locationElement.appendChild(humidityElement);
	locationElement.appendChild(iconElement);

	container.appendChild(locationElement);
}

function refreshWeather() {
	locations.forEach(location => {
		getWeather(location);
	});
}

refreshWeather();
setInterval(refreshWeather, 300000); // Refresh weather every 5 minutes
