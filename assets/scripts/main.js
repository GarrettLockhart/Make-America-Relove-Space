var API_KEY = "pHcVaecY6RB0BWtz3VukErxnlV5Zdw6aZ5thATLI";

$(document).ready(function () {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.addEventListener("click", (e) => {
      lightbox.classList.add("active");
      const img = document.createElement("img");
      img.src = image.src;
      img.style.borderRadius = "10px";
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    });
  });
  // logic to close image if click outside of image, and doesn't close if you click the image itself
  lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
  });
});

$(document).ready(function () {
  // on click of the search button call the API with the parameters passed in and display the results, otherwise return an error if nothing exists for that day
  $('#button-addon3').on('click', function () {
    const searchText = document.getElementById("parameters").value;
    const isoDate = new Date().toISOString().slice(0, 10);
    const photoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${searchText}&page=1&earth_date=${isoDate}&api_key=${API_KEY}`;
    
    fetch(photoApi).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.photos.length > 0) {
          setImgUrls(data)
        } else {
          var errorMsgEl = $('<li>');
              $(errorMsgEl).text('No images on that day, please try again');
              $(errorMsgEl).css({'font-weight': 'bold', 'color': 'white'});
              $('#error-list').append(errorMsgEl);
              // if error, removed displayed error after 5 seconds
              setTimeout(function () {
                $(errorMsgEl).text('');
              }, 4000);
        }
        });
    };
  
    function setImgUrls(data) {
        
        for (var i = 0; i < 12; i++) {
          var imgUrl = data.photos[i].img_src;
          $('#img' + i).attr('src', imgUrl);
        }
      }

  });
  });
});


// Mars Weather API
const weatherAPI = "https://api.maas2.apollorion.com/";

// fetching and logging response and data from API
$(document).ready(function () {
  fetch(weatherAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      });
    } else {
      console.log("there was an error");
    }
  });
});

// var using querySelector to update HTML
var solElement = document.querySelector("[data-sol]");
var earthDateElement = document.querySelector("[data-earth-date]");
var highTempElement = document.querySelector("[data-temp-high]");
var lowTempElement = document.querySelector("[data-temp-low]");
var pressureElement = document.querySelector("[data-pressure]");
var sunriseElement = document.querySelector("[data-sunrise]");
var uvRadiationElement = document.querySelector("[data-uv-index]");
var sunsetElement = document.querySelector("[data-sunset]");

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
      earthDateElement.innerHTML = displayDate(
        new Date(result.terrestrial_date)
      );
      highTempElement.innerHTML = result.max_temp;
      lowTempElement.innerHTML = result.min_temp;
      pressureElement.innerHTML = result.pressure;
      uvRadiationElement.innerHTML = result.local_uv_irradiance_index;
      sunriseElement.innerHTML = result.sunrise;
      sunsetElement.innerHTML = result.sunset;
    });
}

// easier to read date
function displayDate(terrestrial_date) {
  return terrestrial_date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// calling function
displayWeather();

// Dark/Light Icons
const darkIcon = document.querySelector(".fa-regular");
const lightIcon = document.querySelector(".fa-solid");

// storage vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// the dark/light toggles and them being hidden by default
const iconToggle = () => {
  darkIcon.classList.toggle("display-none");
  lightIcon.classList.toggle("display-none");
};

// checking the local storage to see if the user theme and the prefered theme match dark
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    // adds the dark class to the document El and adds display none to the dark icon
    document.documentElement.classList.add("dark");
    darkIcon.classList.add("display-none");
    return;
  }
  lightIcon.classList.add("display-none");
};

// controls adding and removing the dark class from the documentEl and adding/removing the light or dark to the theme in local storage
const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

// light and dark button triggering the switch event
lightIcon.addEventListener("click", () => {
  themeSwitch();
});

darkIcon.addEventListener("click", () => {
  themeSwitch();
});

themeCheck();