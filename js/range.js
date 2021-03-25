(() => {
  var $range = $(".js-range-slider--1"),
  $inputFrom = $(".js-input-from--1"),
  $inputTo = $(".js-input-to--1"),
  instance,
  min = 0,
  max = 1000,
  from = 0,

  to = 0;


  $range.ionRangeSlider({

  type: "double",
  hide_min_max: true,
  hide_from_to: true,
  min: min,
  max: max,
  from: 200,
  to: 800,
  onStart: updateInputs,
  onChange: updateInputs
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs (data) {
  from = data.from;
  to = data.to;

  $inputFrom.prop("value", from);
  $inputTo.prop("value", to);

  let ButtonTextFrom = document.querySelector(".button-select--from--1")
  ButtonTextFrom.textContent = $inputFrom.prop("value");

  let ButtonTextTo = document.querySelector(".button-select--to--1")
  ButtonTextTo.textContent = $inputTo.prop("value");
  }

  $inputFrom.on("input", function () {
  var val = $(this).prop("value");

  // validate
  if (val < min) {
      val = min;
  } else if (val > to) {
      val = to;
  }

  instance.update({
      from: val
  });
  });

  $inputTo.on("input", function () {
  var val = $(this).prop("value");

  // validate
  if (val < from) {
      val = from;
  } else if (val > max) {
      val = max;
  }

  instance.update({
      to: val
  });
  });
})();

var $range = $(".js-range-slider--2"),
$inputFrom = $(".js-input-from--2"),
$inputTo = $(".js-input-to--2"),
instance,
min = 0,
max = 1000000,
from = 0,

to = 0;


$range.ionRangeSlider({

type: "double",
hide_min_max: true,
hide_from_to: true,
min: min,
max: max,
from: 200,
to: 100000,
onStart: updateInputs,
onChange: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs (data) {
from = data.from;
to = data.to;

$inputFrom.prop("value", from);
$inputTo.prop("value", to);

let ButtonTextFrom = document.querySelector(".button-select--from--2")
ButtonTextFrom.textContent = $inputFrom.prop("value");

let ButtonTextTo = document.querySelector(".button-select--to--2")
ButtonTextTo.textContent = $inputTo.prop("value");
}

$inputFrom.on("input", function () {
var val = $(this).prop("value");

// validate
if (val < min) {
    val = min;
} else if (val > to) {
    val = to;
}

instance.update({
    from: val
});
});

$inputTo.on("input", function () {
var val = $(this).prop("value");

// validate
if (val < from) {
    val = from;
} else if (val > max) {
    val = max;
}

instance.update({
    to: val
});
});
( () => {
const filterRadio = document.querySelectorAll(".filter__radio");
const buttonTextRadio = document.querySelector(".button--select--radio")


filterRadio.forEach( (item)=> {
  item.addEventListener("change", function() {
    if (item.checked) {
      buttonTextRadio.textContent = item.value
    }
  })
});
})();
