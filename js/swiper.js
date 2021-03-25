(()=>{
  const breakpoint = window.matchMedia('(min-width: 1367px)');
  let productSwiper;

  const breakpointChecker = function () {
    // if larger viewport and multi-row layout needed
    if (breakpoint.matches === true) {
      // clean up old instances and inline styles when available
      if (productSwiper !== undefined) productSwiper.destroy(true, true);
      // or/and do nothing
      return;
      // else if a small viewport and single column layout needed
    } else if (breakpoint.matches === false) {
      // fire small viewport version of swiper
      return enableSwiper();
    }
  };

  const enableSwiper = function () {
    let productSwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.product-swipper-progressbar ',
        type: 'progressbar',
      },

      paginationClickable: true,
      navigation: {
        nextEl: '.product-swiper__button--next',
        prevEl: '.product-swiper__button--prev',
      },

    });

    for (let key of productSwiper) {
      let mySliderAllSlides = key.el.querySelector('.product-swiper__fraction--total')
      let mySliderCurrentSlide = key.el.querySelector('.product-swiper__fraction--current')
      mySliderAllSlides.innerHTML = key.slides.length;
      key.on('slideChange', function () {
        let currentSlide = ++key.realIndex;
        mySliderCurrentSlide.innerHTML = currentSlide;
      });
    }
  };
  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();

})();
