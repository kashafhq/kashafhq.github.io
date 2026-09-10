/* Kashaf — first-party only. No libraries, nothing fetched.
   Everything here degrades: with JavaScript off the page still reads. */
(function () {
  'use strict';
  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- mobile menu ---------------- */
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) toggle.click();
    });
  }

  /* ---------------- header shadow once you scroll ---------------- */
  var header = document.querySelector('header.site');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- the rotating banner ---------------- */
  var banner = document.querySelector('[data-banner]');
  if (banner) {
    var slides = [].slice.call(banner.querySelectorAll('.slide'));
    var dotWrap = banner.querySelector('.dots');
    var current = 0, timer = null, DELAY = 6500;

    slides.forEach(function (s, i) {
      s.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot' + (i === 0 ? ' on' : '');
      d.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
      d.addEventListener('click', function () { show(i); restart(); });
      dotWrap.appendChild(d);
    });

    function show(n) {
      slides[current].classList.remove('on');
      slides[current].setAttribute('aria-hidden', 'true');
      dotWrap.children[current].classList.remove('on');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('on');
      slides[current].setAttribute('aria-hidden', 'false');
      dotWrap.children[current].classList.add('on');
    }
    function restart() {
      clearInterval(timer);
      if (!reduced) timer = setInterval(function () { show(current + 1); }, DELAY);
    }

    var prev = banner.querySelector('.bprev'), next = banner.querySelector('.bnext');
    if (prev) prev.addEventListener('click', function () { show(current - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(current + 1); restart(); });

    /* stop while someone is reading or interacting */
    banner.addEventListener('mouseenter', function () { clearInterval(timer); });
    banner.addEventListener('mouseleave', restart);
    banner.addEventListener('focusin', function () { clearInterval(timer); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else restart();
    });

    /* swipe on a touch screen */
    var x0 = null;
    banner.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, {passive:true});
    banner.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { show(current + (dx < 0 ? 1 : -1)); restart(); }
      x0 = null;
    }, {passive:true});

    restart();
    banner.classList.add('ready');
  }

  /* ---------------- reveal on scroll ---------------- */
  var reveals = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (reveals.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('shown'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('shown');
          io.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------------- counting numbers ---------------- */
  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length && !reduced && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute('data-count'));
        var start = performance.now(), dur = 1100;
        (function step(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (t < 1) requestAnimationFrame(step);
        })(start);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }
})();
