function switchSlide(num, auto = false) {
    let slide = document.querySelector(".slider .item.active"),
        slideItemLength = document.querySelectorAll(".slider .item").length,
        dataNum = parseInt(slide.dataset.slide);

    if (!auto)
        document.querySelector(".slider").dataset.autoSwitch = 0;

    dataNum = dataNum + num;

    if (dataNum < 1)
        dataNum = slideItemLength;

    if (dataNum > slideItemLength)
        dataNum = 1;

    slide.classList.remove("active");
    slide = document.querySelector(".slider .item[data-slide=\"" + dataNum + "\"]");
    slide.classList.add("active");
}
function menuMobile(menuTop) {
    if (window.outerWidth <= 991)
        menuTop.classList.add("mobile");
    else if (menuTop.classList.contains("mobile"))
        menuTop.classList.remove("mobile");

}
function navMenu(nav) {
    if (window.pageYOffset > nav.offsetTop)
        nav.classList.add('fixed');
    else
        nav.classList.remove('fixed');
}
(function () {
    window.addEventListener('load', function () {

        let menuTop = document.querySelector(".menu.top"),
            nav = document.querySelector('nav'),
            bottonBurger = document.querySelector("button.burger"),
            slider = document.querySelector(".slider");

        navMenu(nav);
        menuMobile(menuTop);

        if (slider)
        {
            if (parseInt(slider.dataset.autoSwitch) === 1)
                autoSwitch();

            function autoSwitch() {
                setTimeout(function () {
                    if (parseInt(slider.dataset.autoSwitch) === 1)
                        switchSlide(1,true);
                    autoSwitch();
                }, slider.dataset.autoSwitchTime);
            }

            slider.style.height = document.documentElement.clientHeight - slider.offsetTop + "px";
        }


        window.addEventListener('scroll', function () {
            navMenu(nav);
        });
        window.addEventListener('resize', function () {
            if (slider) slider.style.height = document.documentElement.clientHeight - slider.offsetTop + "px";
            menuMobile(menuTop);
        });
        bottonBurger.addEventListener("click", function() {
            if (menuTop.classList.contains("show"))
                menuTop.classList.remove("show");
            else
                menuTop.classList.add("show");

        });

        // SLIDERS
        $('.sponsors .grid').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
        $('.main-photo-gallery .photos').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 3
                    }
                }
            ]
        });

        // LOADING
        let loading = document.getElementById('loading'),
            percent = 1;
        function autoLoading() {
            if (percent > 0)
                setTimeout(function () {
                    loading.style.opacity = percent;
                    percent = percent - 0.02;
                    autoLoading();
                }, 1);
            else
                loading.remove();
        }
        autoLoading();
    });
})();