const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#mess1');
const message2 = document.querySelector('#mess2');
const message3 = document.querySelector('#mess3');
const message4 = document.querySelector('#mess4');
const message5 = document.querySelector('#mess5');
const message6 = document.querySelector('#mess6');
const icon = document.createElement('img');
const date = new Date().getHours();
icon.setAttribute('id', 'forecast-icon');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  message4.textContent = '';
  message5.textContent = '';
  message6.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast.summary;
        message3.textContent = `It is currently ${data.forecast.temp.toFixed()} degrees out.`;
        message4.textContent = `This high today is ${data.forecast.high.toFixed()} degrees.`;
        message5.textContent = `This low today is ${data.forecast.low.toFixed()} degrees.`;
        message6.textContent = `There is a ${data.forecast.precipProbability}% chance of rain.`;
      }
      if ((date > 0 && date < 6) || (date > 20)) {
        if (data.forecast.summary.toLowerCase().includes('cloudy')) {
          icon.setAttribute('src', '/img/weather_4.png');
        } else if (data.forecast.summary.toLowerCase().includes('rainy')) {
          icon.setAttribute('src', '/img/weather_6.png');
        } else if (data.forecast.summary.toLowerCase().includes('clear')) {
          icon.setAttribute('src', '/img/weather_2.png');
        }
      } else {
        if (data.forecast.summary.toLowerCase().includes('cloudy')) {
          icon.setAttribute('src', '/img/weather_3.png');
        } else if (data.forecast.summary.toLowerCase().includes('rainy')) {
          icon.setAttribute('src', '/img/weather_5.png');
        } else if (data.forecast.summary.toLowerCase().includes('sunny')) {
          icon.setAttribute('src', '/img/weather_1.png');
        }
      }
    });
  });
});
console.log(date);

document.querySelector('#icon-container').appendChild(icon);