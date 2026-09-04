/* ============================================================================
   enhance.js — the optional layer.

   Everything here is an upgrade on something that already works:

     modal      ← the <details> under each tile already shows the long copy
     card flip  ← both faces are already visible, stacked
     gallery    ← the tile already shows its cover
     lightbox   ← the drawing is already on the page
     payoff     ← the first line is already in the HTML

   Each upgrade sets its own html class ONLY once its listeners are attached,
   so nothing gets hidden by CSS that this file can't then reveal. If this
   file fails to load, or any single init throws, the page stays usable.
   ============================================================================ */

(function () {
  "use strict";

  var D = window.SITE || {};
  var $ = function (s) { return document.querySelector(s); };
  var root = document.documentElement;
  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Same guard as render.js — these two files must not depend on each other. */
  function safePlay(v) {
    try {
      var p = v.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (e) { /* autoplay refusal is normal */ }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ══════════════════════════════════════════ PROJECT MODAL ═══ */
  function initModal() {
    var dlg = $("#modal"), body = $("#modalBody"), x = $("#modalClose"), mount = $("#workMount");
    if (!dlg || !mount) return;

    var native = typeof dlg.showModal === "function";
    var lastFocus = null;

    function open(p) {
      body.innerHTML =
        '<h3 id="modalTitle">' + esc(p.title) + "</h3>" +
        (p.year ? '<span class="tile-year">' + esc(p.year) + "</span>" : "") +
        '<p class="m-hook">' + esc(p.hook) + "</p>" +
        (p.about ? '<p class="m-about">' + esc(p.about) + "</p>" : "") +
        ((p.tech || []).length
          ? '<ul class="chips">' + p.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
          : "") +
        ((p.links || []).length
          ? '<div class="m-links">' + p.links.map(function (l) {
              return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
            }).join("") + "</div>"
          : "");

      lastFocus = document.activeElement;
      if (native) { dlg.showModal(); }
      else { dlg.setAttribute("open", ""); document.body.style.overflow = "hidden"; }
      x.focus();
    }

    function shut() {
      if (native) { dlg.close(); }
      else { dlg.removeAttribute("open"); document.body.style.overflow = ""; }
      if (lastFocus) lastFocus.focus();
    }

    mount.addEventListener("click", function (e) {
      var btn = e.target.closest(".tile-open");
      if (!btn) return;
      var tile = btn.closest(".tile");
      var p = (D.projects || [])[Number(tile.dataset.index)];
      if (p) { e.preventDefault(); open(p); }
    });

    x.addEventListener("click", shut);
    /* click the backdrop */
    dlg.addEventListener("click", function (e) { if (e.target === dlg) shut(); });
    if (!native) {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && dlg.hasAttribute("open")) shut();
      });
    }

    /* Only now is it safe to hide the <details> fallback. */
    root.classList.add("js-modal");
  }

  /* ═══════════════════════════════════════════ HOVER GALLERY ═══ */
  /* One tile cycles through images. Hover on pointers that have hover;
     auto-cycle when visible on everything else, since phones have no hover. */
  function initGallery() {
    var tiles = document.querySelectorAll(".tile-gallery");
    if (!tiles.length) return;
    var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

    Array.prototype.forEach.call(tiles, function (tile) {
      var frames = Array.prototype.slice.call(tile.querySelectorAll(".gal-frame"));
      if (frames.length < 2) return;

      var at = 0, timer = null;

      function show(k) {
        frames[at].classList.remove("is-on");
        at = k;
        frames[at].classList.add("is-on");
      }
      function step() { show((at + 1) % frames.length); }
      function start() {
        /* Under reduced motion, advance one frame instead of running a timer —
           the feature still works, it just doesn't loop at the reader. */
        if (reduced) { step(); return; }
        if (!timer) timer = setInterval(step, 900);
      }
      function stop() { clearInterval(timer); timer = null; show(0); }

      /* Hover and focus are bound unconditionally. On touch, pointerenter
         fires on tap, so this is a working fallback rather than dead code. */
      tile.addEventListener("pointerenter", start);
      tile.addEventListener("pointerleave", stop);
      tile.addEventListener("focusin", start);
      tile.addEventListener("focusout", stop);

      /* Phones have no hover, so cycle it automatically while it's on screen. */
      if (!canHover && !reduced && "IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
        }, { threshold: 0.5 }).observe(tile);
      }
    });
  }

  /* ═══════════════════════════════════════════════ CREW DECK ═══ */
  function initCrew() {
    var deck = $("#crewMount");
    if (!deck) return;
    var cards = Array.prototype.slice.call(deck.querySelectorAll(".crew-card"));
    if (!cards.length) return;

    cards.forEach(function (card, i) {
      /* The card only becomes a control once something can flip it. */
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-expanded", "false");
      card.setAttribute("aria-label", "Flip card to see the clip");

      function flip() {
        var open = card.classList.toggle("flipped");
        card.setAttribute("aria-expanded", String(open));
        var v = card.querySelector("video");
        if (v) {
          if (open) {
            if (v.dataset.src) { v.src = v.dataset.src; delete v.dataset.src; }
            safePlay(v);
          } else {
            v.pause();
          }
        }
      }

      card.addEventListener("click", function (e) {
        /* let the sound button and any link do their own job */
        if (e.target.closest(".sound-btn, a, button:not(.crew-card)")) return;
        flip();
      });

      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); return; }
        if (e.key === "ArrowRight" && cards[i + 1]) { e.preventDefault(); cards[i + 1].focus(); }
        if (e.key === "ArrowLeft"  && cards[i - 1]) { e.preventDefault(); cards[i - 1].focus(); }
      });
    });

    var hint = $("#deckHint");
    if (hint) hint.hidden = false;

    /* Safe to switch on the 3D card and the fan: every card can now flip. */
    root.classList.add("js");
  }

  /* ═══════════════════════════════════════════════ LIGHTBOX ═══ */
  function initLightbox() {
    var box = $("#lightbox"), media = $("#lbMedia"), cap = $("#lbCap"),
        close = $("#lbClose"), mount = $("#scribbleMount");
    if (!box || !mount) return;
    var lastFocus = null;

    function open(item) {
      media.innerHTML = "";
      var el = document.createElement("img");
      el.src = item.src;
      el.alt = item.alt || item.caption || "";
      media.appendChild(el);
      cap.textContent = item.caption || "";
      lastFocus = document.activeElement;
      box.hidden = false;
      close.focus();
      document.body.style.overflow = "hidden";
    }
    function shut() {
      box.hidden = true;
      media.innerHTML = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    mount.addEventListener("click", function (e) {
      var b = e.target.closest(".scrib");
      if (!b) return;
      var item = (D.scribbles || [])[Number(b.dataset.index)];
      if (item) open(item);
    });
    close.addEventListener("click", shut);
    box.addEventListener("click", function (e) { if (e.target === box) shut(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) shut();
    });
  }

  /* ═════════════════════════════════════════ THE SCROLL PAYOFF ═══ */
  function initPayoff() {
    var wrap = $("#payoff"), say = $("#payoffSay"), guy = $("#payoffGuy");
    if (!wrap || !say || !guy) return;

    var lines = (D.payoff || []).slice();
    if (!lines.length) return;
    say.textContent = lines[0];
    var at = 0;

    guy.addEventListener("click", function () {
      at = (at + 1) % lines.length;
      if (reduced) { say.textContent = lines[at]; return; }
      say.classList.add("swap");
      setTimeout(function () {
        say.textContent = lines[at];
        say.classList.remove("swap");
      }, 180);
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { wrap.classList.add("seen"); obs.disconnect(); }
        });
      }, { threshold: 0.35 }).observe(wrap);
    } else {
      wrap.classList.add("seen");
    }
  }

  /* ══════════════════════════════════════════════════════ NAV ═══ */
  function initNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll(".topnav a"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (a && en.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  [initModal, initGallery, initCrew, initLightbox, initPayoff, initNav]
  .forEach(function (fn) {
    try { fn(); } catch (err) { console.error(fn.name + " failed:", err); }
  });
})();
