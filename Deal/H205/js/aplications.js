$(function(){
  if($.cookie('color')) {
    var c_color = $.cookie('color');
    $('body').addClass( c_color );
  }
  
  if($.cookie('color')) {
    var c_background = $.cookie('background');
    $('body').css('background-image','url(images/style_menu/patterns/' + c_background + ')' );
  }
  
  if($.cookie('position')) {
     $('.style_menu').css('left', '0px')
  }

  //show submenu
  $('.left_menu li').hover(function(){
    $(this).addClass('hover');
    $(this).children('.sub_menu').css('display', 'block');
  }, function(){
    $(this).removeClass('hover');
    $(this).children('.sub_menu').css('display', 'none');
  });
  
  //clear input text
  var val;
  $('.input_text').focus(function(){
    val = $(this).attr('title');
    if($(this).attr('value') == val) {
      $(this).attr('value', '');
    }
  });
  $('.input_text').blur(function(){
    if($(this).attr('value') == '') {
      $(this).attr('value', val);
    }
  });
  
  //clear textarea text
  var val_html;
  $('textarea').focus(function(){
    val_html = $(this).attr('title');
    if($(this).val() == val_html) {
      $(this).val('');
    }
  });
  $('textarea').blur(function(){
    if($(this).val() == '') {
      $(this).val(val_html);
    }
  });

  //tabs
  $('.tabs').each(function(index, item){
    var tabContainers = $(item).find(' > div');
    var tab_a = $(item).find('.tabNavigation a');
    tabContainers.hide().filter(':first').show();
    $(tab_a).click(function(){
      tabContainers.hide();
      tabContainers.filter(this.hash).show();
      $(tab_a).removeClass('selected');
      $(this).addClass('selected');
      return false;
    }).filter(':first').click();
  });
  
  //tooltip
  $('.tooltip').hover(function(){
    var tooltip_text = $(this).attr('title');
    $(this).append('<div></div>').fadeIn('slow');
    $(this).find('div').html(tooltip_text);
  }, function(){
    $('.tooltip div').remove();
  });

  //toggle
  $('.toggle .trigger_button').click(function(){
    $(this).next('.trigger_content').slideToggle();
    $(this).children().toggleClass('active');
    return false;
  });

  //accardion
  $('.accardion .trigger_content:first').show();
  $('.accardion .trigger_button span:first').addClass('active');
  $('.accardion .trigger_button').click(function(){
    $('.accardion .trigger_button span').removeClass('active');
    $('.accardion .trigger_content').slideUp();
    $(this).next('.trigger_content').slideDown();
    $(this).children().toggleClass('active');
    return false;
  });

  //go to top
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $('#top_link').fadeIn();
    } else {
      $('#top_link').fadeOut();
    }
  });
  $('#top_link').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });

  //fade effect on images
  $('.fade_image').hover(function(){
    $(this).children('.fade').fadeIn('normal');
  }, function () {
    $(this).children('.fade').fadeOut('fast');
  });

  //lightbox
  $('.lightbox').fancybox({
    'titlePosition'	: 'inside'
  });

  //style menu
  $('.style_menu_button').click( function () {
    var point = $('.style_menu').css('left');
    if (point == '0px') {
      $('.style_menu').animate({'left': '-255px' }, 650)
      $.cookie('position', null);
    } else if (point == '-255px') {
      $('.style_menu').animate({'left': 0 }, 650)
      $.cookie('position', 'value');
    }
  });

  $('.change_background a').click(function() {
    var at_background = $(this).attr('href');
    $('body').css('background-image','url(images/style_menu/patterns/' + at_background + ')' );
    $.cookie('background', at_background);
    return false;
  });
  
  $('.change_color a').click(function() {
    $('body').removeClass();
    var at_color = $(this).attr('title');
    $('body').addClass( at_color );
    $.cookie('color', at_color);
    return false;
  });

  //rating
  $('.rating').ratings(5,3).bind('ratingchanged', function(event, data) {});
});