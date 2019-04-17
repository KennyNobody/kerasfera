$(document).ready(function(){

	var startWindowScroll = 0;

	$('.popup').magnificPopup();
	$('.popup-item').magnificPopup({
		showCloseBtn: false,
	});
	$('.popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: 'true'
	});

	$('.branch__slider-wrapper--1').magnificPopup({
		type: 'image',
		delegate: 'a',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        closeOnContentClick: 'true'
    });

	$('.branch__slider-wrapper--2').magnificPopup({
		type: 'image',
		delegate: 'a',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        closeOnContentClick: 'true'
    });

	$('.branch__slider-wrapper--3').magnificPopup({
		type: 'image',
		delegate: 'a',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        closeOnContentClick: 'true'
    });

	$( ".swiper-button-next" ).click(function( event ) {
		event.stopPropagation();
	});
	$( ".swiper-button-prev" ).click(function( event ) {
		event.stopPropagation();
	});

	$('.call__close').on('click', function(e){
		$.magnificPopup.close();
	});

	$('.discont__btn--cancel').on('click', function(e){
		$.magnificPopup.close();
	});

	$('.autoscroll').on('click', function(e){
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top }, 1000);
		e.preventDefault();
	});

	$(window).on('load scroll', function(e) {
		$('.autoscroll').toggleClass('autoscroll--hidden', $(this).scrollTop() > 600);
	});

    // 
    function reWidth() {
    	if ($(document).width() < 1000) {
    		$('.filter__wrapper').customScroll({
    			vertical: true,
    			horizontal: false
    		});
            // $('.table').customScroll({
            //     vertical: false,
            //     horizontal: true
            // });
        } else {
        	$('.filter__block ul').customScroll({
        		vertical: true,
        		horizontal: false
        	});
        }
    };

    reWidth();

    $(window).on('resize', function(){
    	setTimeout(reWidth, 300);
    });

    $(".filter__block").click(function() {
    	// reWidth();
    	setTimeout(reWidth, 300);
    });

    $(window).scroll(function() {

    	if ($(document).width() < 1000) {
    		if ($(window).scrollTop()  > 300) {
    			$('.filter__mob-title').addClass('filter__mob-title--fixed');
    		} else {
    			$('.filter__mob-title').removeClass('filter__mob-title--fixed');
    		}
    	} 
    });

    $('.grid').masonry({
    	itemSelector: '.grid__item',
    	gutter: 15
    });

    $('.popup-gallery').magnificPopup({
    	delegate: 'a',
    	type: 'image',
    	tLoading: 'Загрузка изображения...',
    	mainClass: 'mfp-img-mobile',
    	gallery: {
    		enabled: true,
    		navigateByImgClick: true,
    		tCounter: '',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
        	tError: 'Ошибка загрузки изображения',
        }
    });

    var swiperBranch = new Swiper('.branch__slider', {
    	loop: true,
    	centeredSlides: true,
    	navigation: {
    		prevEl: '.branch__control--prev',
    		nextEl: '.branch__control--next',
    	},
    });

    //========== Звездочки рейтинга ==========

    $(function() {
    	$('.rating-visible').barrating({
    		theme: 'css-stars',
    		readonly: true,
    	});
    });

    $(function() {
    	$('.rating-input').barrating({
    		theme: 'css-stars',
    		initialRating: 5
    	});
    });

    //========== Синхронный слайдер в карточке товара ==========

    if($("div.gallery-top .swiper-slide").length > 1) {
    	var galleryTop = new Swiper('.gallery-top', {
    		spaceBetween: 10,
    		loop:true,
    		centeredSlides: true,
    		loopedSlides: 3,
    		navigation: {
    			nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
    		},
    		thumbs: {
    			swiper: galleryThumbs,
    		},
    	});

    	var galleryThumbs = new Swiper('.gallery-thumbs', {
    		spaceBetween: 10,
    		slidesPerView: 3,
    		loop: true,
    		centeredSlides: true,
    		loopedSlides: 3,
    		watchSlidesVisibility: true,
    		watchSlidesProgress: true,
    		slideToClickedSlide: true,
    	});

    	galleryTop.controller.control = galleryThumbs;
    	galleryThumbs.controller.control = galleryTop;

    } else {
    	$("div.gallery-thumbs").hide();
    	$("div.swiper-button-next").hide();
    	$("div.swiper-button-prev").hide();
    }

    // Вкладки в карточке товара

    $(".tabs__link ").click(function(){
    	$(".tabs__link").removeClass('tabs__link--active');
    	$(this).addClass('tabs__link--active');
    	var thisTab = ($(this).index());
    	console.log(thisTab);
    	$(".tabs__block").css({'display':'none'});
    	$(".tabs__block").eq(thisTab).css({'display':'flex'});
    });

    $(".data__dropdown-link").click(function(){
    	$(".data__block-info").toggleClass('data__block-info--hidden');
    	if ($('.data__block-info').hasClass('data__block-info--hidden')) {
    		$(".data__dropdown-link").text('Развернуть');
    	} else {
    		$(".data__dropdown-link").text('Свернуть');
    	}
    });

    //========== 3D-модели слайдер ==========

    if($("div.tabs__slider-wrapper  .swiper-slide").length > 5) {
    	var galleryTop = new Swiper('.tabs__slider', {
    		spaceBetween: 10,
    		slidesPerView: 'auto',
    		centeredMode: true,
    		loop:true,
    		centeredSlides: true,
    		loopedSlides: 5,
    		navigation: {
    			nextEl: '.tabs__slider-btn--next',
    			prevEl: '.tabs__slider-btn--prev',
    		},
    	}) 
    } else {
    	$('.tabs__slider').addClass('tabs__slider--static');
    };

    // Галерея там же

    $('.tabs__slider-wrapper').magnificPopup({
    	delegate: 'a',
    	type: 'image',
    	mainClass: 'mfp-img-mobile',
    	closeOnContentClick: true,
    	gallery: {
    		enabled: true,
    		navigateByImgClick: true,
    		tCounter: '',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
    });

    $('.gallery-top-popups').magnificPopup({
    	delegate: 'a',
    	type: 'image',
    	mainClass: 'mfp-img-mobile',
    	closeOnContentClick: true,
    	gallery: {
    		enabled: true,
    		navigateByImgClick: true,
    		tCounter: '',
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
    });

    //========== Счетчик в корзине ==========

    $(".cart__btn--minus").click(function(e){
    	$(this).bind('selectstart',function(){return false;});
    	var number = $(this).parent().children('.cart__counter-total').val();
    	if (number > 1) {
    		number--;
    		$(this).parent().children('.cart__counter-total').val(number);
    		$(this).parent().children('.cart__counter-total').trigger('change');
    	}
    	e.preventDefault();
    });

    $(".cart__btn--plus").click(function(e){
    	$(this).bind('selectstart',function(){return false;});
    	var number = $(this).parent().children('.cart__counter-total').val();
    	number++;
    	$(this).parent().children('.cart__counter-total').val(number);
    	$(this).parent().children('.cart__counter-total').trigger('change');
    	e.preventDefault();
    });

    //========== Счетчик в карточке товара ==========

    $(".style__btn--minus").click(function(){
    	var number = $(this).parent().children('input').val();
    	if (number > 1) {
    		number--;
    		$(this).parent().children('input').val(number);
    	}
    });

    $(".style__btn--plus").click(function(){
    	var number = $(this).parent().children('input').val();
    	number++;
    	$(this).parent().children('input').val(number);
    });


    //========== Чекбоксы в заполнении заказа ==========

    // $(".data__checkbox-1").click(function(){
    // 	$(this).find(".data__input-1").prop('checked', true);
    // 	$(this).addClass("data__checkbox-1--checked");
    // 	$(".data__checkbox-1").not(this).removeClass("data__checkbox-1--checked");
    // 	$(".data__checkbox-1").not(this).find(".data__input-1").prop('checked', false);
    // });

    // $(".data__checkbox-2").click(function(){
    // 	$(this).find(".data__input-2").prop('checked', true);
    // 	$(this).addClass("data__checkbox-2--checked");
    // 	$(".data__checkbox-2").not(this).removeClass("data__checkbox-2--checked");
    // 	$(".data__checkbox-2").not(this).find(".data__input-2").prop('checked', false);
    // });

    // $(".data__checkbox-3").click(function(){
    // 	$(this).find(".data__input-3").prop('checked', true);
    // 	$(this).addClass("data__checkbox-3--checked");
    // 	$(".data__checkbox-3").not(this).removeClass("data__checkbox-3--checked");
    // 	$(".data__checkbox-3").not(this).find(".data__input-3").prop('checked', false);
    // });

    $(".data").on( "click", ".data__checkbox", function(e) {
    	if (e.target.tagName == 'INPUT') return;
    	var $target = $(e.target);
    	if (!$target.hasClass('data__checkbox')) $target = $target.parents('.data__checkbox');
    	$target.parent().find('input[type="radio"]').each(function(){
    		$(this).prop('checked', false); 
    	});
    	$target.find('input[type="radio"]').prop('checked', true).trigger('click');
    });

    // $(".data").on( "click", ".data__checkbox-2", function(e) {
    //     if($(e.target).find('input[type="radio"]').length) {
    //       $(e.target).find('input[type="radio"]').trigger('click');
    //     } else {
    //       $(e.target).find('input[type="checkbox"]').trigger('click');
    //     }
    // });

    // $(".data").on( "click", ".data__checkbox-3", function(e) {
    //     if($(e.target).find('input[type="radio"]').length) {
    //       $(e.target).find('input[type="radio"]').trigger('click');
    //     } else {
    //       $(e.target).find('input[type="checkbox"]').trigger('click');
    //     }
    // });

    //========== Проверка чекбокса ==========

    $('.sign__accept input').on('change', function(){
    	if($(this).prop("checked") == true){
    		$('#sign__button').removeClass('sign__button--disabled');
    	}else{
    		$('#sign__button').addClass('sign__button--disabled');
    	}
    });

    $('.faq__form .faq__accept input').on('change', function(){
    	if($(this).prop("checked") == true){
    		$('.faq__form .faq__btn').removeClass('faq__btn--disabled');
    	}else{
    		$('.faq__form .faq__btn').addClass('faq__btn--disabled');
    	}
    });

    $('.call__question input').on('change', function(){
    	if($(this).prop("checked") == true){
    		$('.call__control-btn').removeClass('call__control-btn--disabled');
    	}else{
    		$('.call__control-btn').addClass('call__control-btn--disabled');
    	}
    });

    $('.write__checked-wrap input').on('change', function(){
    	if($(this).prop("checked") == true){
    		$('.write__btn').removeClass('write__btn--disabled');
    	}else{
    		$('.write__btn').addClass('write__btn--disabled');
    	}
    });

    // Переключение вкладок регистрации

    $(".sign__nav-link--1").click(function(){
    	$('.sign__block--2').css({'display' : 'none'});
    	$('.sign__block--1').css({'display' : 'block'});
    	$('.sign__nav-link--1').addClass('sign__nav-link--active');
    	$('.sign__nav-link--2').removeClass('sign__nav-link--active');
    });

    $(".sign__nav-link--2").click(function(){
    	$('.sign__block--1').css({'display' : 'none'});
    	$('.sign__block--2').css({'display' : 'block'});
    	$('.sign__nav-link--2').addClass('sign__nav-link--active');
    	$('.sign__nav-link--1').removeClass('sign__nav-link--active');
    });

    //========== Инициализируем мобильное меню ===========
    $("#mob-menu").mmenu({
    	'navbar': {
    		"title": "<span class='logo navline__logo'>КЕРАСФЕРА</span>",
        // "titleLink": 'none'
    },
    extensions: {
    	"all": ["theme-white", "pagedim-black", "border-none", "fx-menu-slide"],
    	"(min-height: 600px)": ["listview-large"],
    	"(min-height: 900px)": ["listview-huge"]
    }
}, {
	offCanvas: {
		pageSelector: "#page"
	}
});

});

