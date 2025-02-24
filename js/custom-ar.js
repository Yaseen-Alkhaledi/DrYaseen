(function ($) {
    "use strict";

    // NAVBAR
    $('.navbar-nav .nav-link').click(function () {
        // التحقق مما إذا كان العنصر الذي تم النقر عليه ليس من نوع dropdown-toggle
        if (!$(this).hasClass('dropdown-toggle')) {
            $(".navbar-collapse").collapse('hide');
        }
    });

    // Dropdown Language Selector
    $(document).ready(function () {
        $('#languageDropdown .dropdown-item').click(function (event) {
            // التحقق من الصفحة الحالية والنص الذي تم النقر عليه
            if (window.location.href.includes('infex-ar.html') && $(this).text().trim() === 'العربية') {
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
        rtl: true, // إضافة دعم للاتجاه من اليمين إلى اليسار
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
        rtl: true, // إضافة دعم للاتجاه من اليمين إلى اليسار
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

    if (scrollToTopBtn) { // التحقق من وجود العنصر
        scrollToTopBtn.style.display = "none"; // إخفاء الزر عند تحميل الصفحة

        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "flex"; // إظهار الزر عند التمرير لأسفل
            } else {
                scrollToTopBtn.style.display = "none"; // إخفاء الزر عند التمرير للأعلى
            }
        };

        scrollToTopBtn.addEventListener("click", () => {
            document.body.scrollTop = 0; // للمتصفحات القديمة
            document.documentElement.scrollTop = 0; // للمتصفحات الحديثة
        });
    }

    // PRELOADER
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('preloader-container').style.opacity = '0';
            setTimeout(function () {
                document.getElementById('preloader-container').style.display = 'none';
            }, 500); // نفس مدة التلاشي في CSS (500 ميلي ثانية)
        }, 3000);
    });

    // EMAILJS INITIALIZATION
    (function () {
        emailjs.init("_loTrX55kO3tc56ip"); // استبدل بالـ Public Key الخاص بك
    })();

    // EMAIL SENDING FUNCTION
    function sendEmail(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // إخفاء النموذج
        document.querySelector('.php-email-form').classList.add('hide-form');

        // جمع بيانات النموذج
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            subject: document.querySelector('input[name="subject"]').value,
            message: document.querySelector('textarea[name="message"]').value,
        };

        // إرسال البريد الإلكتروني
        emailjs.send("service_67wmxby", "template_g72nnkc", formData)
            .then(function (response) {
                // إظهار رسالة النجاح
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.textContent = "تم إرسال رسالتك بنجاح!"; // رسالة النجاح بالعربية
                    successMessage.classList.add('show-success');

                    // إخفاء رسالة النجاح بتلاشي بعد 3 ثوانٍ
                    setTimeout(function () {
                        successMessage.classList.add('hide-success');
                        setTimeout(function () {
                            successMessage.classList.remove('show-success', 'hide-success');
                        }, 500); // الانتظار حتى يكتمل التلاشي
                    }, 3000);

                    // مسح محتوى النموذج
                    document.querySelector('.php-email-form').reset();

                    // إعادة إظهار النموذج بعد إخفاء رسالة النجاح
                    setTimeout(function () {
                        document.querySelector('.php-email-form').classList.remove('hide-form');
                    }, 3500); // الانتظار حتى يكتمل إخفاء الرسالة
                } else {
                    console.error("عنصر success-message غير موجود في الصفحة.");
                }
            }, function (error) {
                alert("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."); // رسالة الخطأ بالعربية

                // إعادة إظهار النموذج في حالة الخطأ
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
