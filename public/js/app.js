const message1 = document.querySelector('#mess1');
const message2 = document.querySelector('#mess2');
const message3 = document.querySelector('#mess3');
const message4 = document.querySelector('#mess4');
const message5 = document.querySelector('#mess5');
const icon = document.querySelector('#icon');
const daily = document.querySelector('#daily');

const weather = (address) => {
  fetch(`/weather?address=${address}`).then((response) => {

    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast.summary;
        message3.textContent = `${data.forecast.temp.toFixed()}°`;
        message4.textContent = `⤓${data.forecast.low.toFixed()}°`;
        message5.textContent = `⤒${data.forecast.high.toFixed()}°`;
        icon.setAttribute('src', `/img/${data.forecast.icon}.png`);
        data.forecast.daily.forEach((day) => {
          const dailyForecast = document.createElement('div');
          let temp = document.createElement('p');
          temp.className = 'dailyTemp';
          let days = document.createElement('p');
          days.className = 'dailyTemp'
          let img = document.createElement('img');
          img.setAttribute('src', `/img/${day.icon}.png`)
          dailyForecast.appendChild(days);
          dailyForecast.appendChild(temp);
          dailyForecast.appendChild(img);
          const weekDay = new Date(day.time * 1000).toString().split(' ');
          days.textContent = `${weekDay[0]}, ${weekDay[1]} ${weekDay[2]}`;
          temp.textContent = `${day.temperatureHigh.toFixed()}°`;

          daily.appendChild(dailyForecast);
        });
      }
    });
  })
}

if (!navigator.geolocation) {
  alert('Your browser does not support geolocation!');
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    weather(`${longitude},${latitude}`);
  });
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  daily.innerHTML = '';
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  message4.textContent = '';
  message5.textContent = '';
  icon.removeAttribute('src');
  const location = document.querySelector('input').value;
  weather(location);
});
