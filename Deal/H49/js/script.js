jQuery(document).ready(function ($) {



  /* Contact map */
  var marker_location = new Array();
  var map = new Array();
  var marker = new Array();
  $('.google_map').each(function (index) {
    marker_location[index] = new google.maps.LatLng($(this).attr('data-latitude'), $(this).attr('data-longitude'));
    map[index] = new google.maps.Map($(this)[index], {
      zoom: parseInt($(this).attr('data-zoom')),
      center: marker_location[index],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker[index] = new google.maps.Marker({
      position: marker_location[index],
      map: map[index]
    });
  });



  /* Static map */
  $('.google_static_map').each(function (index) {
    src = '//maps.googleapis.com/maps/api/staticmap?' +
      'markers=' + $(this).attr('data-latitude') + ',' + $(this).attr('data-longitude') +
      '&zoom=' + $(this).attr('data-zoom') +
      '&size=' + $(this).attr('data-size') +
      '&sensor=false';
    $(this).html('<img src="' + src + '" alt="">');
  });



  /* Background 
  $.supersized({
    slides: [ {image: 'placeholders/1280x1024/10.jpg'} ]
  }); */



  /* Fancybox */
  $('a.fancybox_photo').fancybox({
    'transitionIn': 'elastic',
    'padding': 0,
    'overlayColor': '#000'
  });
  $('a.fancybox_video').fancybox({
    'transitionIn': 'elastic',
    'padding': 0,
    'overlayColor': '#000',
    'type': 'iframe'
  });



  /* Contact form */
  $('#contact_form').submit(function () {

    $('#contact_form .status').html('Sending...');

    /* Send AJAX request. */
    $.ajax({
      type: 'POST',
      url: window.location,
      data: {
        eqfw_contact_form_name: $('#contact_form input#name').val(),
        eqfw_contact_form_email: $("#contact_form input#email").val(),
        eqfw_contact_form_message: $("#contact_form textarea").val(),
        eqfw_contact_form_submitted: '1'
      },
      success: function(data) {

        if ( data == 'sent' ) {
          $('#contact_form .status').html('E-mail has been sent.');
        } else if ( data == 'invalid' ) {
          $('#contact_form .status').html('Your name, email or message is invalid.');
        } else {
          //alert(data);
          $('#contact_form .status').html('E-mail has not been sent.');         
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {

        //alert(jqXHR.status + ' - ' + textStatus + ' - ' + errorThrown);
        $('#contact_form .status').html('E-mail could not be sent.');

      }
    });

    return false;

  });



  /* Category filter */
  $('.filter a').click(function () {

    /* Select menu item */
    $('.filter a').removeClass('selected');
    $(this).addClass('selected');

    /* Fade in category */
    $('.filterable li').addClass('faded');
    $('.filterable').children($(this).attr('data-filter')).removeClass('faded');
    
    return false;

  });



  /* Sliders */
  $(window).resize(function () {

    $('.photo_slider').refineSlide({
      controls: 'arrows',
      transition: 'cubeV',
      fallback3d: 'sliceV',
      autoPlay: true,
      delay: 5000,
      transitionDuration: 800,
      captionWidth: 100
    });

    $('.content_slider').refineSlide({
      controls: 'arrows',
      transition: 'fade',
      autoPlay: true,
      delay: 5000,
      transitionDuration: 800,
      captionWidth: 100
    });

  }).resize();



  /* Mobile navigation */
  $('nav.mobile').append('<select />');
  var $mobile_nav = $('nav.mobile select');
  $('nav.desktop li').each(function () {

    a = $(this).children('a');
    selected = ( a.hasClass('selected') ) ? 'selected="selected"' : '';
    intend = ( $(this).parents('li').length > 0 ) ? '&nbsp;&nbsp;' : '';
    $mobile_nav.append('<option value="' + a.attr('href') + '" ' + selected + '>' + intend + a.text() + '</option>');

  });
  $('nav.mobile select').change(function () {
    window.location = $(this).find('option:selected').attr('value');
  });



  /* Touch scroll */
  $('.touch_scroll').touchScroll({hScroll: true});



  /* Orbit */
  $('.orbit_slider').orbit({
    timer: false
  });



  /* Masonry */
  var $masonry = $('.portfolio, .masonry');
  $masonry.imagesLoaded( function(){
    $masonry.not('.no-masonry').masonry();
  });



  /* Recent tweets */
  $('.tweets').each(function () {
    var $tweets = $(this); 
    $.getJSON('http//twitter.com/statuses/user_timeline.json?screen_name=' + $tweets.attr('data-source') + '&count=' + $tweets.attr('data-count') + '&callback=?', function (data) {
        $tweets.html('');
        for(i in data) {
          $tweets.append(
            '<li>\
              <a href="http//twitter.com/' + data[i].user.screen_name + '"><img src="' + data[i].user.profile_image_url + '" alt=""></a>\
              <p>' + data[i].text + '</p>\
              <span class="time">' + prettyDate(data[i].created_at) + '</span>\
            </li>'
          );
        }
    });
  });



  /* Form placeholder */
  $('input, textarea').placeholder();



});