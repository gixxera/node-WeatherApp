const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/1ead24749ff199b0097d70d7fd5f878f/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temp: body.currently.temperature,
        high: body.daily.data[0].temperatureHigh,
        low: body.daily.data[0].temperatureLow,
        precipProbability: body.currently.precipProbability
      });
    }
  });
}

module.exports = forecast;

