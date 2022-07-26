$('#light-mode-toggle').on('click', function () {
  var iconEL = $('#light-mode-btn');
  if (iconEL.hasClass('fa-regular')) {
    $(iconEL).toggleClass('fa-solid');
  }
});

$(document).ready(function () {
  var API_KEY = 'pHcVaecY6RB0BWtz3VukErxnlV5Zdw6aZ5thATLI';

  var API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

  fetch(API_URL).then(function (response) {
    if (response.ok) {
      console.log('🚀 ~ file: main.js ~ line 14 ~ response', response);

      response.json().then(function (data) {
        console.log('🚀 ~ file: main.js ~ line 16 ~ data', data);
      });
    } else {
      console.log('there was an error');
    }
  });
});
