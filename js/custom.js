(function ($) {
    "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function () {
        if (!$(this).hasClass('dropdown-toggle')) {
            $(".navbar-collapse").collapse('hide');
        }
    });

    // Dropdown Language Selector
    $(document).ready(function () {
        $('#languageDropdown .dropdown-item').click(function (event) {
            if (window.location.href.includes('index.html') && $(this).text().trim() === 'English') {
                event.preventDefault();
                event.stopPropagation();
                $('#languageDropdown .dropdown-toggle').dropdown('hide');
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
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
                margin: 100,
            },
            1280: {
                items: 2,
                margin: 100,
            }
        }
    });

    // TESTIMONIALS CAROUSEL
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

    // BANNER CAROUSEL
    var myCarousel = document.querySelector('#myCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 1500,
    });

    // REVIEWS NAVIGATION
    function reviewsNavResize() {
        $(".navbar").scrollspy({ offset: -94 });

        var reviewsOwlItem = $('.reviews-carousel .owl-item').width();
        $('.reviews-carousel .owl-nav').css({ 'width': reviewsOwlItem + 'px' });

        var testimonialsOwlItem = $('.testimonials-carousel .owl-item').width();
        $('.testimonials-carousel .owl-nav').css({ 'width': testimonialsOwlItem + 'px' });
    }

    $(window).on("resize", reviewsNavResize);
    $(document).on("ready", reviewsNavResize);

    // SMOOTH SCROLLING FOR HREF LINKS
    $('a[href*="#"]').click(function (event) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname
        ) {
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

    // SCROLL TO TOP BUTTON
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        scrollToTopBtn.style.display = "none";

        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "flex";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        scrollToTopBtn.addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    // PRELOADER
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('preloader-container').style.opacity = '0';
            setTimeout(function () {
                document.getElementById('preloader-container').style.display = 'none';
            }, 500);
        }, 3000);
    });

    // EMAILJS INITIALIZATION
    (function () {
        emailjs.init("6mNErdijf3X74F_IN"); // Replace with your EmailJS Public Key
    })();

    // EMAIL SENDING FUNCTION
    function sendEmail(event) {
        event.preventDefault(); // Prevent page reload

        // Hide the form
        document.querySelector('.php-email-form').classList.add('hide-form');

        // Collect form data
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            subject: document.querySelector('input[name="subject"]').value,
            message: document.querySelector('textarea[name="message"]').value,
        };

        // Send email using EmailJS
        emailjs.send("service_0bkl8hb", "template_9g2x8oi", formData)
            .then(function (response) {
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.textContent = "Your message has been sent successfully!";
                    successMessage.classList.add('show-success');

                    // Hide success message after 3 seconds
                    setTimeout(function () {
                        successMessage.classList.add('hide-success');
                        setTimeout(function () {
                            successMessage.classList.remove('show-success', 'hide-success');
                        }, 500);
                    }, 3000);

                    // Clear form content
                    document.querySelector('.php-email-form').reset();

                    // Show form again after hiding success message
                    setTimeout(function () {
                        document.querySelector('.php-email-form').classList.remove('hide-form');
                    }, 3500);
                } else {
                    console.error("Success message element not found.");
                }
            }, function (error) {
                alert("An error occurred while sending the message. Please try again.");

                // Show form again in case of error
                document.querySelector('.php-email-form').classList.remove('hide-form');
            });
    }

    // FORM SUBMISSION HANDLER
    document.querySelector('.php-email-form').addEventListener('submit', sendEmail);

    // BUTTON PRESS EFFECT
    document.querySelector('button[type="submit"]').addEventListener('mousedown', function () {
        this.classList.add('button-pressed');
    });

    document.querySelector('button[type="submit"]').addEventListener('mouseup', function () {
        this.classList.remove('button-pressed');
    });
})(window.jQuery);
