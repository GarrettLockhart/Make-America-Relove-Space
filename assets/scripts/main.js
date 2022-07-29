// $("#light-mode-toggle").on("click", function () {
//   var iconEL = $("#light-mode-btn");
//   if (iconEL.hasClass("fa-regular")) {
//     $(iconEL).toggleClass("fa-solid");
//   }
// });

$(document).ready(function () {
  var API_KEY = "pHcVaecY6RB0BWtz3VukErxnlV5Zdw6aZ5thATLI";

  var API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
// this is a const that creates a dynamic date with iso format and slice.
  const isoDate = new Date().toISOString().slice(0, 10);
//   this is the api and the where parameters, used template strings back ticks
  const photoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=340&page=1&api_key=${API_KEY}`;
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
        setImgUrls(data)
        console.log(data);
      });
    } else {
      console.log("there was an error");
    }
  });

    function setImgUrls(data) {
    console.log("🚀 ~ file: main.js ~ line 50 ~ setImgUrls ~ data", data)
      
      for (var i = 0; i < 7; i++) {
        var imgUrl = data.photos[i].img_src;
        $('#img' + i).attr('src', imgUrl);
      }
    }
});

// Mars Weather API
const weatherAPI = 'https://api.maas2.apollorion.com/'

// fetching and logging response and data from API
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

// var using querySelector to update HTML
var solElement = document.querySelector('[data-sol]')
var earthDateElement = document.querySelector('[data-earth-date]')
var highTempElement = document.querySelector('[data-temp-high]')
var lowTempElement = document.querySelector('[data-temp-low]')
var pressureElement = document.querySelector('[data-pressure]')
var sunriseElement = document.querySelector('[data-sunrise]')
var uvRadiationElement = document.querySelector('[data-uv-index]')
var sunsetElement = document.querySelector('[data-sunset]')

// function to fetch API and update HTML
function displayWeather() {
  var requestData = {
    method: "GET",
    redirect: "follow",
  };
  fetch(weatherAPI, requestData)
  .then((response) => response.json())
  .then((result) => {
    solElement.innerHTML = result.sol;
    earthDateElement.innerHTML = result.terrestrial_date;
    highTempElement.innerHTML = result.max_temp;
    lowTempElement.innerHTML = result.min_temp;
    pressureElement.innerHTML = result.pressure;
    uvRadiationElement.innerHTML = result.local_uv_irradiance_index;
    sunriseElement.innerHTML = result.sunrise;
    sunsetElement.innerHTML = result.sunset; 
  })
}

// calling function
displayWeather()

// Dark/Light Icons
const darkIcon = document.querySelector(".fa-regular");
const lightIcon = document.querySelector(".fa-solid");

// storage vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;


const iconToggle = () => {
  darkIcon.classList.toggle("display-none");
  lightIcon.classList.toggle("display-none");
}


const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    darkIcon.classList.add("display-none");
    return;
  }
  lightIcon.classList.add("display-none")
}


const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle ();
    return;    
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle ();
}



lightIcon.addEventListener("click", () => {
  themeSwitch();
});

darkIcon.addEventListener("click", () => {
  themeSwitch();
});


themeCheck();



