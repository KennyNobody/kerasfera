
$(document).ready(function(){

    // Количество записей на странице

    $(".shop__counter-btn").click(function(){
        $(".shop__counter-btn").removeClass('shop__counter-btn—active');
        $(this).addClass('active');
        $(".page_nav a").removeClass('active');
        $(".page_nav a[rel=1]").addClass('active');
        recount();
    });

    // Обновление фильтра

    var IInterval = null;

    function recount(Flag){

        // Задаем интервал обновления фильтра
        if(Flag != true){

            if(IInterval != null){
                clearInterval(IInterval);
            }

            IInterval = setInterval(function(){
                recount(true);
            }, 1000);

            return false;
        } else {
            clearInterval(IInterval);
        };

        // Диапазон цен
        var minPrice = "min=" + $(".price .noUi-handle-lower").attr('aria-valuenow');
        var maxPrice = "max=" + $(".price .noUi-handle-upper").attr('aria-valuenow');

        // Производители
        if($(".filter__block--PROIZVODITEL input[type='checkbox']:checked")) {
            var manufacturers = [];
            $(".filter__block--PROIZVODITEL input[type='checkbox']:checked").each(function() {
                manufacturers.push($(this).val());
            });
            var strManufacturers = 'PROIZVODITEL='+ manufacturers.join();
        } else {
            // return false;
        };

        // Коллекции
        if($(".filter__block--KOLLEKTSIYA input[type='checkbox']:checked")) {
            var collection = [];
            $(".filter__block--KOLLEKTSIYA input[type='checkbox']:checked").each(function() {
                collection.push($(this).val());
            });
            var strCollection = 'KOLLEKTSIYA='+ collection.join();
        } else {
            // return false;
        };

        // Размеры
        if($(".filter__block--KOLLEKTSIYA input[type='checkbox']:checked")) {
            var sizes = [];
            $(".filter__block--KOLLEKTSIYA input[type='checkbox']:checked").each(function() {
                sizes.push($(this).val());
            });
            var strSizes = 'KOLLEKTSIYA='+ sizes.join();
        } else {
            // return false;
        };

        // Цвета
        if($(".filter__block--TSVET input[type='checkbox']:checked")) {
            var colors = [];
            $(".filter__block--TSVET input[type='checkbox']:checked").each(function() {
                colors.push($(this).val());
            });
            var strColors = 'TSVET='+ colors.join();
        } else {
            // return false;
        };

        // Стиль
        if($(".filter__block--STIL input[type='checkbox']:checked")) {
            var style = [];
            $(".filter__block--STIL input[type='checkbox']:checked").each(function() {
                style.push($(this).val());
            });
            var strStyle = 'STIL='+ style.join();
        } else {
            // return false;
        };

        // Назначение
        if($(".filter__block--TIP_NAZNACHENIE input[type='checkbox']:checked")) {
            var purpose = [];
            $(".filter__block--TIP_NAZNACHENIE input[type='checkbox']:checked").each(function() {
                purpose.push($(this).val());
            });
            var strPurpose = 'TIP_NAZNACHENIE='+ purpose.join();
        } else {
            // return false;
        };

        // Поверхность
        if($(".filter__block--POVERKHNOST input[type='checkbox']:checked")) {
            var surface = [];
            $(".filter__block--POVERKHNOST input[type='checkbox']:checked").each(function() {
                surface.push($(this).val());
            });
            var strSurface = 'POVERKHNOST='+ surface.join();
        } else {
            // return false;
        };

        // Страна
        if($(".filter__block--STRANA input[type='checkbox']:checked")) {
            var country = [];
            $(".filter__block--STRANA input[type='checkbox']:checked").each(function() {
                country.push($(this).val());
            });
            var strCountry = 'STRANA='+ country.join();
        } else {
            // return false;
        };

        // Категория в "акциях"
        if ($(".shop__tag--active").attr("name")){
            var tags = [];
            tags.push($(".shop__tag--active").attr("name"));
            var strTags = 'tag=' + tags.join();
        } else {
            // return false;
        };

        // Номер страницы
        if ($(".page_nav span.active").attr("rel")){
            var pages = [];
            pages.push($(".page_nav span.active").attr("rel"));
            var strPages = 'page=' + pages.join();
        } else {
            // return false;
        };

        // Количество элементов на странице
        if ($(".shop__counter-btn—active").text()){
            var counter = [];
            counter.push($(".shop__counter-btn—active").text());
            var strCounter = 'count=' + counter.join();
        } else {
            // return false;
        };

        // собираем все в массив
        var checks = [minPrice, maxPrice, strManufacturers, strCollection, strSizes, strColors, strStyle, strPurpose, strSurface, strCountry, strTags, strPages, strCounter];

        // Превращаем все в строку

        var resultText = checks.join('?');  

        // Отправляем запрос:
        // $.ajax({
        //     url: "/shop/ajax.php",
        //     cache: false,
        //     type: "GET",
        //     data:({array: checks}),
        //     success: function(data){
        //         $(".filter_content").html(data);
        //         history.pushState({param: 'Value'}, '', '?'+resultText);
        //     }
        // });
    }

});

// Дальше ничего не трогал, все как на старом сайте
// Пагинация 

$(".page_nav span").click(function(){
    if ($(this).attr("date-name") == "arrow"){
        var current = $(".double span.active").text();
        $(".page_nav span").removeClass("active");
        if ($(this).hasClass("left")){
            $(".page_nav span").each(function(){
                if($(this).text() == current-1){
                    $(this).addClass('active');
                }
            })
        }else if($(this).hasClass("right")){
            $(".page_nav span").each(function(){
                if(parseInt($(this).text()) == parseInt(current) + parseInt(1)){
                    $(this).addClass('active');
                }
            })
        }else if($(this).hasClass("first")){
            $("span[rel=1]").addClass('active');
        }else if($(this).hasClass("last")){
            $("span[rel=1]").addClass('active');
        }
    }else{
        $(".page_nav span").removeClass("active");
        $(this).addClass('active');
    }
    recount();

    // Выпадашки с чекбоксами

    $(".filter__name").click(function(){
        $(this).parent().toggleClass('filter__block--open');
    });

    $(".filter__mob-title").click(function(){
        $('.body').toggleClass('body--filter');
    });

    $(".filter__overlay").click(function(){
        $('.body').toggleClass('body--filter');
    });

    $(".filter__reset").click(function(){
        $('.filter__block input').prop("checked", 0);
        $(".filter__checked-block").remove();
        $(".filter label").removeClass('active');
        keypressSlider.noUiSlider.set([0, 50000]);
    });

    //===========Дальше идет старый Фильтр ===========

    $('.filter__block input[type="checkbox"]').click(function(){
        var label = $(this).parent('label');
        if (label.hasClass("active")){
            label.removeClass('active');
            $(".filter__checked-block").each(function(){
                if($(this).children('.selected').text() == label.children("span").text()){
                    $(this).remove();
                }
            });
        }else{
            var liname = $(this).parent("label").children("span").text();
            $(".filter__title").after('<div class="filter__checked-block"><span class="selected">' + liname + '</span> x</div>');
            label.addClass('active');
        }
    });

    $('.filter').on("click", ".filter__checked-block", function(){
        var name = $(this).children(".selected").text();

        $(this).remove();
        $("label.active").each(function(){
            var rewq = $(this).children("span").text();
            if (rewq == name){
                $(this).removeClass('active');
                $(this).children("input").prop("checked", 0);
                recount();
            }
        });
    });

     // Слайдер цены

     var keypressSlider = document.getElementById('filter__range');
     var input0 = document.getElementById('input-with-keypress-0');
     var input1 = document.getElementById('input-with-keypress-1');
     var inputs = [input0, input1];


     if (keypressSlider) {
        noUiSlider.create(keypressSlider, {
            start: [20, 50000],
            connect: true,
            step: 100,
        // tooltips: [true, wNumb({decimals: 1})],
        range: {
            'min': [0],
            'max': 50000
        }
    });

        keypressSlider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = +values[handle];
            recount();
        });

        // Listen to keydown events on the input field.
        inputs.forEach(function (input, handle) {
            input.addEventListener('change', function () {
                keypressSlider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
                var values = keypressSlider.noUiSlider.get();
                var value = Number(values[handle]);
                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                var steps = keypressSlider.noUiSlider.steps();
                // [down, up]
                var step = steps[handle];
                var position;
                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {
                    case 13:
                    keypressSlider.noUiSlider.setHandle(handle, this.value);
                    break;
                    case 38:
                    // Get step to go increase slider value (up)
                    position = step[1];
                    // false = no step is set
                    if (position === false) {
                        position = 1;
                    }
                    // null = edge of slider
                    if (position !== null) {
                        keypressSlider.noUiSlider.setHandle(handle, value + position);
                    }
                    break;
                    case 40:
                    position = step[0];
                    if (position === false) {
                        position = 1;
                    }
                    if (position !== null) {
                        keypressSlider.noUiSlider.setHandle(handle, value - position);
                    }
                    break;
                }
            });
        });
    }
});

