const message1 = document.querySelector('#mess1');
const message2 = document.querySelector('#mess2');
const message3 = document.querySelector('#mess3');
const message4 = document.querySelector('#mess4');
const message5 = document.querySelector('#mess5');
const icon = document.querySelector('#icon');
const daily = document.querySelector('#daily');

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  daily.innerHTML = '';
  const location = document.querySelector('input').value;
  message1.textContent = 'Loading...';
  fetch(`/weather?address=${location}`).then((response) => {

    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast.summary;
        message3.textContent = `${data.forecast.temp.toFixed()}°`;
        message4.textContent = `⤓${data.forecast.low.toFixed()}°`;
        message5.textContent = `⤒${data.forecast.high.toFixed()}°`;
      }
      icon.setAttribute('src', `/img/${data.forecast.icon}.png`);
      data.forecast.daily.forEach((day) => {
        const dailyForecast = document.createElement('div');
        let temp = document.createElement('p');
        let days = document.createElement('p');
        dailyForecast.appendChild(days);
        dailyForecast.appendChild(temp);
        const weekDay = new Date(day.time * 1000).toString().split(' ');
        days.textContent = `${weekDay[0]} ${weekDay[1]} ${weekDay[2]}`;
        temp.textContent = `${day.temperatureHigh.toFixed()}°`;

        daily.appendChild(dailyForecast);
      });
    });
  });
});