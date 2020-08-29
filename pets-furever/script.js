
$(document).ready(function () {
  $('.carousel').carousel();
});


$('.carousel.carousel-slider').carousel({
  fullWidth: true
});

$(document).ready(function () {
  $('.fixed-action-btn').floatingActionButton();
});


// sliders
var slider = document.getElementById('test-slider');
noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  step: 1,
  orientation: 'horizontal', // 'horizontal' or 'vertical'
  range: {
    'min': 0,
    'max': 100
  },
  format: wNumb({
    decimals: 0
  })
});



// var instance = M.FormSelect.getInstance(elem);

$(document).ready(function () {
  $('select').formSelect();
});
