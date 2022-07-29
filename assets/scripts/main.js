

$("#light-mode-toggle").on("click", function () {
  var iconEL = $("#light-mode-btn");
  if (iconEL.hasClass("fa-regular")) {
    $(iconEL).toggleClass("fa-solid");
  }
});

$(document).ready(function () {
  var API_KEY = "pHcVaecY6RB0BWtz3VukErxnlV5Zdw6aZ5thATLI";

  var API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
// this is a const that creates a dynamic date with iso format and slice.
  const isoDate = new Date().toISOString().slice(0, 10);
//   this is the api and the where parameters, used template strings back ticks
  const photoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&page=1&earth_date=${isoDate}&api_key=${API_KEY}`;
//   this is console log for dynamic date
  console.log(isoDate);
  fetch(API_URL).then(function (response) {
    if (response.ok) {
      console.log("🚀 ~ file: main.js ~ line 14 ~ response", response);

      response.json().then(function (data) {
        console.log("🚀 ~ file: main.js ~ line 16 ~ data", data);
      });
    } else {
      console.log("there was an error");
    }
  });
// this is fetching and function thats appendng the images in the dom.
  fetch(photoApi).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        data.photos.forEach(appendImg);
        console.log(data);
        // data.photos.forEach(item => {
        //     console.log(item.img_src);
        // });
      });
    } else {
      console.log("there was an error");
    }
  });
  //   this is an arrow funtion
  const element = (tag, attributes = {}) =>
//   this is an object assign
    Object.assign(document.createElement(tag), attributes);
  const appendImg = function (item) {
    document.getElementById("images").appendChild(
      element("img", {
        src: item.img_src,
        alt: item.id,
        width: "100",
        height: "100",
        // add/change attributes to size imgages either thru js or tailwind. object.assign
      })
    );
  };
});

const weatherAPI = 'https://api.maas2.apollorion.com/'
var solElement = document.querySelector('[data-sol')
var earthDateElement = document.querySelector('[data-earth-date')
var highTempElement = document.querySelector('data-temp-high')
var lowTempElement = document.querySelector('data-temp-low')
var pressureElement = document.querySelector('data-pressure')
var sunriseElement = document.querySelector('data-sunrise')

$(document).ready(function () {
  fetch(weatherAPI).then(function (response) {
    if (response.ok) {
      console.log("🚀 ~ file: main.js ~ line 84 ~ response", response);

      response.json().then(function (data) {
        console.log("🚀 ~ file: main.js ~ line 84 ~ data", data);
      });
    } else {
      console.log("there was an error");
    }
  });
});

displayWeather()

// function displayWeather() {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow"
//   }
// }
function displayWeather () {
  var requestOptions = {
    method: "Get",
    redirect: "follow",
  };

  fetch(weatherAPI, requestOptions).then((respones) => response.json())
  .then((result) => {
    solElement.innerHTML = result.sol;
    earthDateElement.innerHTML = result.terrestrial_date;
    highTempElement.innerHTML = result.max_temp;
    lowTempElement.innerHTML = result.min_temp;
    pressureElement.innerHTML = result.pressure;
    sunriseElement.innerHTML = result.sunrise;
  })
}