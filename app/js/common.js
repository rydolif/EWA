$(function() {

//-------------------------portfolio slider-----------------------------------------------
  $('.portfolio__slider').slick({
    dots: false,
    speed: 300,
    slidesToShow: 4,
    rows: 2,
    centerMode: true,
    centerPadding: '250px',
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          centerPadding: '150px',
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: '100px',
        }
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 3,
          centerPadding: '50px',
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '30px',
        }
      }
    ]
  });

//-------------------------package slider-----------------------------------------------
  var swiperone = new Swiper('.package__slider', {
    spaceBetween: 30,
    // effect: 'fade',
    speed: 300,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

//-------------------------скорость якоря---------------------------------------
  $(".header__list").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  //--------------------закриття меню при кліку на ссилку якоря--------------------
     $('.hamburger').removeClass('hamburger-active');
     $('.header-menu').removeClass('header-menu');
     $('.header-active').removeClass('header-active');
     $('.nav-active').removeClass('nav-active');

  });

//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('hamburger-active');
    $('nav').toggleClass('nav-active');
    $('header').toggleClass('header-menu');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

});

//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});


