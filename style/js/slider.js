jQuery(document).ready(function($) {

    "use strict";

    // Loader
    $('#page-preloader').fadeOut('slow');
    $('#page-preloader .spinner').fadeOut('slow');

    // Slider
    (function ($) {
        $.fn.slider = function(options) {

            // Опции по умолчанию
            var options = $.extend( {
                'sliderItemsNumber' : 4,
                'sliderAutoPlay' : true,
                'sliderAutoPlaySpeed' : 2000,
                'sliderSpeed': 300
            }, options);

            return this.each(function() {

                var $this = $(this);

                // Построение слайдера
                $($this).wrap("<div class='slider_wrap'></div>"); // Создадим обвёртку для слайдера
                var sliderWidth = $($this).outerWidth(); // Ширина слайдера
                var sliderItem = $($this).children(); // Все слайды
                $(sliderItem).wrap("<div class='slider_item'></div>"); // Создадим обвёртку для каждого слайда

                // Проверка количества реальных слайдов
                if($(sliderItem).length > 1){
                    // Проверка количества отображаемых слайдов
                    if(options.sliderItemsNumber > $(sliderItem).length){
                        options.sliderItemsNumber = $(sliderItem).length
                    }
                    $($this).children().eq(0).clone().appendTo($this); // Клонирование первого реального элемента в конец
                    $($this).children().eq(-2).clone().prependTo($this); // Клонирование последнего реального элемента в начало
                    var sliderItemWidth = sliderWidth / options.sliderItemsNumber; // Определяем ширину одного слайда
                    $($this).children().width(sliderItemWidth); // Задаём ширину каждому слайду
                    $($this).width(sliderItemWidth * $($this).children().length); // Задаём ширину обвёртке
                    $($this).css({"margin-left": "-"+sliderItemWidth+"px"}); // Смещение обвёртки слайдера влево на 1 слайд
                    $($this).parent().append("<div class='arrows'><a class='prev' href='#'><< Prev</a><a class='next' href='#'>Next >></a></div>"); // Добавление навигации
                    var prev = $($this).parent().find(".prev");
                    var next = $($this).parent().find(".next");
                }

                // Движение в право
                function prevSlide() {
                    $($this).animate({left: sliderItemWidth+"px"},options.sliderSpeed,function () {
                        $($this).children().last().remove();
                        $($this).children().eq(-2).clone().prependTo($this);
                        $($this).css({"left": 0});
                    });
                }

                // Движение в лево
                function nextSlide() {
                    $($this).animate({left: "-"+sliderItemWidth+"px"},options.sliderSpeed,function () {
                        $($this).children().first().remove();
                        $($this).children().eq(1).clone().appendTo($this);
                        $($this).css({"left": 0});
                    });
                }

                // Автоматическое листание
                // Остановка при наведении на слайдер
                $($this).parent().hover(function () {
                    $($this).parent().addClass("hover");
                }, function () {
                    $($this).parent().removeClass("hover");
                });
                function autoPlay() {
                    setInterval(function () {
                        if(!$($($this).parent()).hasClass("hover")){
                            nextSlide();
                        }
                    },options.sliderAutoPlaySpeed);
                }
                if(options.sliderAutoPlay){
                    autoPlay();
                }

                // События по нажатию на навигацию
                $(prev).on("click", function () {
                    prevSlide();
                    return false;
                });
                $(next).on("click", function () {
                    nextSlide();
                    return false;
                });

            });
        };
    })( jQuery );

    // Иниацилизация слайдера
    $('#slider').slider({
        sliderItemsNumber: 200,
        sliderAutoPlay: true,
        sliderAutoPlaySpeed: 500
    });
    $('#carousel').slider({
        sliderItemsNumber: 2,
        sliderAutoPlay: false
    });
    $('#singleSlider').slider({
        sliderItemsNumber: 1,
        sliderAutoPlay: true,
        sliderSpeed: 800
    });

});