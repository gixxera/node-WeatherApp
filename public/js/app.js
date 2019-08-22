console.log('Cliend side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#mess1');
const message2 = document.querySelector('#mess2');
const message3 = document.querySelector('#mess3');
const message4 = document.querySelector('#mess4');
const message5 = document.querySelector('#mess5');
const message6 = document.querySelector('#mess6');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  message4.textContent = '';

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
    });
  });
});