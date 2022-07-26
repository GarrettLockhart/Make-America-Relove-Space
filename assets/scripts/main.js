$('#light-mode-toggle').on('click', function() {
  var iconEl = $('#light-mode-btn')

  if (iconEl.hasClass('fa-regular')) {
    $(iconEl).removeClass('fa-regular').addClass('fa-solid');
  } else {
    $(iconEl).removeClass('fa-solid').addClass('fa-regular');
  }
  
})