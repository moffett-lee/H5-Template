$( function()
  {
    //styleselector
    $( '#styleselector-toggle' ).bind( 'click', 
      function()
      {
        target = $( '#styleselector' );
        
        if( target.css( 'right' ) == '0px' )
        {
          target.animate( {
            right: '-175px'
          } );
        }
        else
        {
          target.animate( {
            right: '0px'
          } );
        }
      } );
      
    $( '#colors li' ).bind( 'click', 
      function()
      {
        $( '#colors li' ).removeClass( 'color-active' );
        $( this ).addClass( 'color-active' );
        
        color = $( this ).attr( 'id' );
        
        if( color == 'purple' )
        {
          $( '#styleselector_css' ).attr( 'href', '' );
        } else {
          $( '#styleselector_css' ).attr('href', 'assets/css/' + color + '.css');
        }
      } );
    
    //parallax
    $( window ).scroll( function()
    {
      $( '#parallax1' ).css( 'background-position', '0 -' + $( window ).scrollTop() * 0.5 + 'px' );
      $( '#parallax2' ).css( 'background-position',  '0 -' + $( window ).scrollTop() * 0.2 + 'px' );
    } )
    
    
    //move navbar
    if( $( window ).width() >= 979 )
    {
      if( $( window ).scrollTop() > 40 )
      {
        $( '.navbar' ).addClass( 'navbar-move' ).css( 'margin-top', 0 );
      }
      else
      {
        $( '.navbar' ).removeClass( 'navbar-move' ).css( 'margin-top', ( 40 - $( window ).scrollTop() ) + 'px' )
      }

      $( window ).scroll( function()
      {
        if( $( window ).width() >= 979 )
        {
          if( $( window ).scrollTop() > 40 )
          {
            $( '.navbar' ).addClass( 'navbar-move' ).css( 'margin-top', 0 );
          }
          else
          {
            $( '.navbar' ).removeClass( 'navbar-move' ).css( 'margin-top', ( 40 - $( window ).scrollTop() ) + 'px' );
          }
        }
      } );
    }
    
    // toggle sections
    $( 'section .head .content' ).bind( 'click', 
      function()
      {
        target = $( this ).parents( 'section' ).find( '.box-content' );
        
        if( target.css( 'display' ) == 'block' )
        {
          $( this ).find( '.arrow' ).addClass( 'arrow-up' );
          $( this ).parents( 'section' ).animate( {
            marginBottom: '50px'
          }, 500 );
          $( this ).parents( 'section' ).prev( 'section' ).animate( {
            marginBottom: '50px'
          }, 500 );
        }
        else
        {
          $( this ).find( '.arrow' ).removeClass( 'arrow-up' );
          $( this ).parents( 'section' ).animate( {
            marginBottom: '300px'
          }, 500 );
          $( this ).parents( 'section' ).prev( 'section' ).animate( {
            marginBottom: '300px'
          }, 500 );
        }
        
        target.slideToggle( 'slow' );
      } );
    
    // topnav click event
    $( 'ul.nav a, #brand a, .custom-nav' ).bind( 'click',
      function( event )
      {
        var that = $( this );

        $( '[data-spy="scroll"]' ).each( 
          function()
          {
            var spy = $( this ).scrollspy( 'refresh' )
          } );
        
        var offset = 140;
        
        // if window width is smaller than 979px, don't add offset
        if( $( window ).width() < 979 )
        {
          offset = 0;
        }

        $( 'html, body' ).stop().animate(
        {
          scrollTop: $( that.attr( 'href' ) ).offset().top - offset
        },
        1000,
        'easeInOutExpo'
        );

        event.preventDefault();
      } );
  } );
  

function contact_send()
{
  contact_data = new Object();
  contact_data.name = $( '#contact-form input[name="name"]' ).val();
  contact_data.email = $( '#contact-form input[name="email"]' ).val();
  contact_data.message = $( '#contact-form textarea[name="message"]' ).val();
  
  // validation
  if( contact_data.name == '' )
  {
    $( '#contact-form input[name="name"]' ).parents( '.content-no-vert' ).addClass( 'error' );
    $( '#contact-form input[name="name"]' ).parents( '.content-no-vert' ).fadeOut( 'slow',
      function()
      {
        $( this ).fadeIn( 'slow' );
      } );
    return false;
  }
  else
  {
    $( '#contact-form input[name="name"]' ).parents( '.content-no-vert' ).removeClass( 'error' );
  }
  
  if( contact_data.email == '' || !/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/.test( contact_data.email ) )
  {
    $( '#contact-form input[name="email"]' ).parents( '.content-no-vert' ).addClass( 'error' );
    $( '#contact-form input[name="email"]' ).parents( '.content-no-vert' ).fadeOut( 'slow',
      function()
      {
        $( this ).fadeIn( 'slow' );
      } );
    return false;
  }
  else
  {
    $( '#contact-form input[name="email"]' ).parents( '.content-no-vert' ).removeClass( 'error' );
  }
  
  $.ajax(
  {
    type: 'POST',
    url: 'ajax_contact.php',
    data: 'name=' + contact_data.name + '&email=' + contact_data.email + '&subject=' + contact_data.subject + '&message=' + contact_data.message,
    success: function()
    {
      $( '#contact-form input[name="name"]' ).val( '' );
      $( '#contact-form input[name="email"]' ).val( '' );
      $( '#contact-form textarea[name="message"]' ).val( '' );
      
      $( '#contact-form .button' ).fadeOut( 'slow', function()
      {
        $( '#contact-form .button' ).html( 'SENT!' );
        $( '#contact-form .button' ).fadeIn( 'slow' );
        setTimeout( function()
        {
          $( '#contact-form .button' ).fadeOut( 'slow', function()
          {
            $( '#contact-form .button' ).html( 'Send us a letter!' );
            $( '#contact-form .button' ).fadeIn( 'slow' );
          } );
        },
        3000 );
      } );
    }
  } );
}