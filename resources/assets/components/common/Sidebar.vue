<template>
  <div class="col-md-3 left_col">
    <div class="left_col scroll-view">
      <div class="navbar nav_title" style="border: 0;">
        <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>[Order Fulfilment]</span></a>
      </div>
      <div class="clearfix"></div>
      <!-- sidebar menu -->
      <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
          <h3>General</h3>
          <ul class="nav side-menu">
            <li>
              <a v-link="'/'"><i class="fa fa-home"></i> Order <span class="fa fa-chevron-down"></span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // Sidebar
  $(document).ready(function() {
    var CURRENT_URL = window.location.href.split('?')[0];
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
      // reset height
      $('.right_col').css('min-height', $(window).height());

      var bodyHeight = $('body').outerHeight(),
        footerHeight = $('body').hasClass('footer_fixed') ? 0 : $('footer').height(),
        leftColHeight = $('.left_col').eq(1).height() + $('.sidebar-footer').height(),
        contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      // normalize content
      contentHeight -= $('.nav_menu').height() + footerHeight;

      // $('.right_col').css('min-height', contentHeight);
    };

    $('#sidebar-menu').find('a').on('click', function(ev) {
      var $li = $(this).parent();

      if ($li.is('.active')) {
        $li.removeClass('active active-sm');
        $('ul:first', $li).slideUp(function() {
          setContentHeight();
        });
      } else {
        // prevent closing menu if we are on child menu
        if ($li.parent().is('.child_menu')) {
          $('#sidebar-menu').find('li').removeClass('active active-sm');
          $('#sidebar-menu').find('li ul').slideUp();
        }

        $li.addClass('active');

        $('ul:first', $li).slideDown(function() {
          setContentHeight();
        });
      }
    });
     $('#sidebar-menu').find('ul ul').removeClass('active')
    // toggle small or large menu
    $('#menu_toggle').on('click', function() {
      if ($('body').hasClass('nav-md')) {
        $('#sidebar-menu').find('li.active ul').hide();
        $('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
      } else {
        $('#sidebar-menu').find('li.active-sm ul').show();
        $('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
      }

      $('app').toggleClass('nav-md nav-sm');

      setContentHeight();
    });

    // recompute content when resizing
    $(window).smartresize(function(){
      setContentHeight();
    });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
      $('.menu_fixed').mCustomScrollbar({
        autoHideScrollbar: true,
        theme: 'minimal',
        mouseWheel:{ preventDefault: true }
      });
    }
  });
  // /Sidebar
</script>
