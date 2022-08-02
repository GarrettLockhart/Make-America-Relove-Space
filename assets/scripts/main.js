$("#light-mode-toggle").on("click", function () {
  var iconEL = $("#light-mode-btn");
  if (iconEL.hasClass("fa-regular")) {
    $(iconEL).toggleClass("fa-solid");
  }
});
const API_KEY = "pHcVaecY6RB0BWtz3VukErxnlV5Zdw6aZ5thATLI";
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
const isoDate = new Date().toISOString().slice(0, 10);

$(document).ready(function () {
  // this is a const that creates a dynamic date with iso format and slice.
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
});

function search() {
  //set document.getid to variable
  const searchText = document.getElementById("parameters").value;
  //   this is the api and the where parameters, used template strings back ticks
  const photoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${searchText}&page=1&earth_date=${isoDate}&api_key=${API_KEY}`;
  const imagesDiv = document.getElementById("images");
  clearSearchRestuls();
  fetch(photoApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.photos.length > 0) {
          data.photos.forEach((photo) => {
            const divs = document.createElement("div");
            let classes = `w-1/2 p-1 md:p-2`.split(" ");
            divs.classList.add(...classes);
            imagesDiv.appendChild(divs);
            divs.appendChild(
              element("img", {
                src: photo.img_src,
                alt: photo.id,
              })
            );
          });
        } else {
          const pTag = document.createElement("pTag");
          pTag.className = "text-white";
          imagesDiv.appendChild(pTag);
          pTag.innerText = "There were no photos taken on this sol date";
        }
      });
    } else {
      console.log("there was an error");
    }
  });
  //   this is an arrow funtion
  const element = (tag, attributes = {}) =>
    //   this is an object assign
    Object.assign(document.createElement(tag), attributes);
}

function clearSearchRestuls() {
  document.getElementById("images").innerHTML = "";
}
