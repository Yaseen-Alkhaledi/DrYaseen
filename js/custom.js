(function ($) {
    "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        // التحقق مما إذا كان العنصر الذي تم النقر عليه هو "Change Language"
        if (!$(this).hasClass('dropdown-toggle')) {
            $(".navbar-collapse").collapse('hide');
        }
    });

    // إضافة مستمع حدث لعناصر القائمة المنسدلة
    $(document).ready(function() {
        $('#languageDropdown .dropdown-item').click(function(event) {
            // التحقق من الصفحة الحالية والنص الذي تم النقر عليه
            if (window.location.href.includes('index.html') && $(this).text().trim() === 'English') {
                event.preventDefault(); // منع التحويل إلى صفحة أخرى
                event.stopPropagation(); // منع انتشار الحدث
                $('#languageDropdown .dropdown-toggle').dropdown('hide'); // إخفاء القائمة المنسدلة
            }
        });
    });

    // REVIEWS CAROUSEL
    $('.reviews-carousel').owlCarousel({
        center: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 300,
        smartSpeed: 500,
        responsive:{
          0:{
            items:1,
          },
          768:{
            items:2,
            margin: 100,
          },
          1280:{
            items:2,
            margin: 100,
          }
        }
    });

    // Useful Information
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    // Banner Carousel
    var myCarousel = document.querySelector('#myCarousel')
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 1500,
    })

    // REVIEWS NAVIGATION
    function ReviewsNavResize(){
      $(".navbar").scrollspy({ offset: -94 });

      var ReviewsOwlItem = $('.reviews-carousel .owl-item').width();
      $('.reviews-carousel .owl-nav').css({'width' : (ReviewsOwlItem) + 'px'});

      var TestimonialsOwlItem = $('.testimonials-carousel .owl-item').width();
      $('.testimonials-carousel .owl-nav').css({'width' : (TestimonialsOwlItem) + 'px'});
    }

    $(window).on("resize", ReviewsNavResize);
    $(document).on("ready", ReviewsNavResize);

    // HREF LINKS
    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 74
          }, 1000);
        }
      }
    });
    
})(window.jQuery);