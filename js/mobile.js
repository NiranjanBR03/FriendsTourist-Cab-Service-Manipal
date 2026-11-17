/* ============================================================
   Friends Tourist — Mobile behaviour layer
   Added 2026-11-16. Loaded AFTER js/main.js on every page.
   No content is changed here. Only:
   1) hero height that respects the mobile browser chrome
   2) closing the mobile menu after a link is tapped
   3) enabling swipe dots on the destination carousel (mobile)
   ============================================================ */
(function ($) {
  "use strict";

  /* 1) Hero height.
     main.js sets .js-fullheight to $(window).height() in px.
     On phones that value jumps when the address bar shows/hides
     and can cut the heading. Clear the inline height on small
     screens and let css/mobile.css (92svh / 92dvh) take over. */
  function fixHeroHeight() {
    var isMobile = window.matchMedia("(max-width: 991.98px)").matches;
    if (!isMobile) return;
    $(".js-fullheight").each(function () {
      // Keep the class for styling, drop the JS-set pixel height.
      this.style.height = "";
      this.style.minHeight = "";
    });
    // Keep --vh available for any future use.
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  }

  var resizeTimer;
  $(window).on("resize orientationchange", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fixHeroHeight, 120);
  });
  // Run after main.js has set its height, and again once fonts load.
  $(window).on("load", fixHeroHeight);
  fixHeroHeight();

  /* 2) Close the mobile menu when a nav link is tapped.
     Bootstrap's collapse normally stays open until the toggler
     is tapped again; on a phone that covers the page. */
  $(document).on("click", "#ftco-nav .nav-link", function () {
    var $nav = $("#ftco-nav");
    if ($nav.hasClass("show") && window.innerWidth < 992) {
      $nav.collapse("hide");
    }
  });

  /* 3) Dots on the destination carousel, phones only.
     The carousel already shows 1 item on phones; dots make
     swiping discoverable. Desktop behaviour is untouched. */
  $(window).on("load", function () {
    try {
      if (window.innerWidth < 768 && $.fn.owlCarousel) {
        var $dest = $(".carousel-destination");
        if ($dest.length && $dest.data("owl.carousel")) {
          // Owl reads `dots` at init; re-init only if dots are off.
          var opts = $dest.data("owl.carousel").options || {};
          if (!opts.dots) {
            $dest.trigger("destroy.owl.carousel");
            $dest.owlCarousel({
              center: false, loop: true, items: 1, margin: 16,
              stagePadding: 0, nav: false, dots: true,
              responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } }
            });
          }
        }
        var $testi = $(".carousel-testimony");
        if ($testi.length && $testi.data("owl.carousel")) {
          var tOpts = $testi.data("owl.carousel").options || {};
          if (!tOpts.dots) {
            $testi.trigger("destroy.owl.carousel");
            $testi.owlCarousel({
              center: true, loop: true, items: 1, margin: 16,
              stagePadding: 0, nav: false, dots: true,
              responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
            });
          }
        }
      }
    } catch (e) { /* never break the page if Owl is unavailable */ }
  });
})(jQuery);
