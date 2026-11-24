/* ==========================================================================
   Friends Tourist — Apple Liquid Glass UI & Optical Refraction Engine
   Inspired by ybouane/liquidglass & nikdelvin/liquid-glass
   Features:
   - Dynamic SVG Optical Refraction & Displacement Filter Injection
   - visionOS-style Spatial Light & Specular Angle Tracking (Mouse + Touch)
   - Dynamic Island Navbar Glass Adaptation on Scroll
   - Haptic Spring Touch Response
   ========================================================================== */
(function ($) {
  "use strict";

  // 1. Inject Liquid Glass SVG Refraction Filter Definitions
  function injectLiquidGlassSVG() {
    if (document.getElementById("liquid-glass-defs")) return;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "liquid-glass-defs");
    svg.setAttribute("style", "position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden;");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = [
      '<defs>',
      '  <filter id="liquid-glass-refraction" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox">',
      '    <feTurbulence type="fractalNoise" baseFrequency="0.035 0.035" numOctaves="2" result="noise" />',
      '    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />',
      '    <feSpecularLighting in="noise" surfaceScale="2" specularConstant="1.2" specularExponent="24" lighting-color="#ffffff" result="specular">',
      '      <fePointLight x="-50" y="-80" z="220" />',
      '    </feSpecularLighting>',
      '    <feComposite in="specular" in2="displaced" operator="in" result="specular-cut" />',
      '    <feBlend mode="screen" in="specular-cut" in2="displaced" />',
      '  </filter>',
      '  <filter id="liquid-glass-chromatic" x="-10%" y="-10%" width="120%" height="120%">',
      '    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="1" result="turbulence" />',
      '    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="G" yChannelSelector="B" />',
      '  </filter>',
      '</defs>'
    ].join("");
    document.body.appendChild(svg);
  }

  // 2. Spatial Liquid Glass Light Tracking (Mouse & Touch)
  function initSpatialGlassTracking() {
    var glassElements = [
      ".ftco_navbar",
      ".project-wrap",
      ".services.services-1",
      ".testimony-wrap",
      ".contact-info .box",
      ".about-intro",
      ".ft-booking-actions",
      ".btn.btn-primary"
    ].join(", ");

    $(document).on("mousemove", glassElements, function (e) {
      var rect = this.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.setProperty("--mouse-x", x.toFixed(2) + "%");
      this.style.setProperty("--mouse-y", y.toFixed(2) + "%");
    });

    $(document).on("mouseleave", glassElements, function () {
      this.style.setProperty("--mouse-x", "50%");
      this.style.setProperty("--mouse-y", "50%");
    });

    // Touch device support
    $(document).on("touchstart touchmove", glassElements, function (e) {
      if (e.originalEvent.touches && e.originalEvent.touches[0]) {
        var touch = e.originalEvent.touches[0];
        var rect = this.getBoundingClientRect();
        var x = ((touch.clientX - rect.left) / rect.width) * 100;
        var y = ((touch.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty("--mouse-x", x.toFixed(2) + "%");
        this.style.setProperty("--mouse-y", y.toFixed(2) + "%");
      }
    });
  }

  // 3. Dynamic Island Navbar Frosted Scroll Transition
  function handleNavbarGlass() {
    var $navbar = $(".ftco_navbar");
    if (!$navbar.length) return;
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 40) {
      if (!$navbar.hasClass("scrolled")) {
        $navbar.addClass("scrolled");
      }
    } else {
      if ($navbar.hasClass("scrolled")) {
        $navbar.removeClass("scrolled");
      }
    }
  }

  // 4. Mobile Menu Outside-Click Close & Smooth State Class
  $(document).on("show.bs.collapse", "#ftco-nav", function () {
    $(".ftco_navbar").addClass("menu-open");
  });
  $(document).on("hide.bs.collapse", "#ftco-nav", function () {
    $(".ftco_navbar").removeClass("menu-open");
  });
  $(document).on("click", function (e) {
    var $nav = $("#ftco-nav");
    if (
      $nav.hasClass("show") &&
      !$(e.target).closest("#ftco-nav").length &&
      !$(e.target).closest(".navbar-toggler").length
    ) {
      $nav.collapse("hide");
    }
  });

  // 5. Apple Spring Tap Physics on Buttons
  $(document).on("mousedown touchstart", ".btn, .ft-booking-actions a", function () {
    $(this).css("transform", "scale(0.96)");
  });
  $(document).on("mouseup touchend touchcancel blur", ".btn, .ft-booking-actions a", function () {
    $(this).css("transform", "");
  });

  // Init on DOM Ready
  $(function () {
    injectLiquidGlassSVG();
    initSpatialGlassTracking();
    handleNavbarGlass();

    // Smooth in-page movement keeps the hero booking card feeling like a native app.
    $(document).on("click", 'a.js-scroll-trigger[href^="#"]', function (e) {
      var target = $($(this).attr("href"));
      if (target.length) {
        e.preventDefault();
        $("html, body").stop().animate({ scrollTop: target.offset().top - 94 }, 650, "easeInOutCubic");
      }
    });

    // Build a WhatsApp enquiry from the editable route and customer phone fields.
    $(document).on("click", "#hero-book-trigger", function (e) {
      e.preventDefault();
      var pickup = $.trim($("#enquiry-pickup").val());
      var destination = $.trim($("#enquiry-destination").val());
      var phone = $.trim($("#enquiry-phone").val());
      var phoneDigits = phone.replace(/\D/g, "");

      if (!pickup) { $("#enquiry-pickup")[0].reportValidity(); return; }
      if (!destination) { $("#enquiry-destination")[0].reportValidity(); return; }
      if (!phone || phoneDigits.length < 7) {
        $("#enquiry-phone")[0].setCustomValidity("Please enter a valid WhatsApp number.");
        $("#enquiry-phone")[0].reportValidity();
        $("#enquiry-phone")[0].setCustomValidity("");
        return;
      }

      var message = "Hello Friends Tourist, I would like to send an enquiry.\n\nPick-up: " + pickup + "\nGoing to: " + destination + "\nMy phone number: " + phone;
      window.open("https://wa.me/919900984841?text=" + encodeURIComponent(message), "_blank", "noopener");
    });

    // A very light spatial drift on desktop adds depth without affecting touch scrolling.
    if (window.matchMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $(document).on("mousemove", ".hero-wrap", function (e) {
        if (window.innerWidth < 992) return;
        var x = ((e.clientX / window.innerWidth) - 0.5) * 1.8;
        var y = ((e.clientY / window.innerHeight) - 0.5) * 1.8;
        this.style.backgroundPosition = (50 + x) + "% " + (50 + y) + "%";
      });
    }
  });

  $(window).on("scroll load resize", handleNavbarGlass);

})(jQuery);
