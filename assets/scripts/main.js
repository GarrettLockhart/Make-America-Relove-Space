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
        // console.log(data);
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



