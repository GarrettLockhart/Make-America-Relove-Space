$('#light-mode-toggle').on('click', function () {
  var iconEL = $('#light-mode-btn');
  if (iconEL.hasClass('fa-regular')) {
    $(iconEL).toggleClass('fa-solid');
  }
});
