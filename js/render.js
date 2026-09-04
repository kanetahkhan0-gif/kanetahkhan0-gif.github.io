/* ============================================================================
   render.js — turns data.js into semantic HTML.

   This file owns CONTENT. Everything it writes is real markup — headings,
   lists, figures, <details> — that reads correctly with no CSS and no
   enhancement layer. Anything a piece of content needs in order to function
   at all (lazy video, the clip-failed fallback, the sound toggle) lives here
   too, so it survives even if js/enhance.js never runs.

   Decoration and upgraded interactions live in enhance.js.

   You should not need to edit this file to add content — see data.js.
   ============================================================================ */

(function () {
  "use strict";

  var D = window.SITE;
  if (!D) { console.error("data.js did not load — nothing to render."); return; }

  var $ = function (s) { return document.querySelector(s); };

  /* HTMLMediaElement.play() only returns a Promise in modern browsers; in
     older Safari and some WebViews it returns undefined, and calling .catch()
     on that throws. Autoplay refusal is normal and must never surface. */
  function safePlay(v) {
    try {
      var p = v.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (e) { /* refused or unsupported — nothing to do */ }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Deterministic tilt, -3deg to 3deg. Derived from position so the angles
     never reshuffle between renders. */
  var TILTS = [-2.6, 1.8, -1.2, 2.8, -2.1, 1.1, -0.7, 2.2, -1.7, 2.5];
  function tilt(i) { return TILTS[i % TILTS.length] + "deg"; }

  /* ---------------------------------------------------------------------- */
  /* Missing asset → a labelled box naming the file, not a broken-image icon */
  /* ---------------------------------------------------------------------- */
  function placeholder(path, label) {
    var d = document.createElement("div");
    d.className = "ph";
    d.innerHTML = "<span>" + esc(label) + "</span><b>" + esc(path) + "</b>";
    return d;
  }
  function guard(el, path, label) {
    el.addEventListener("error", function () {
      if (el.parentNode) el.parentNode.replaceChild(placeholder(path, label), el);
    });
  }
  function img(src, alt, path, label, cls) {
    var el = document.createElement("img");
    el.loading = "lazy";
    el.decoding = "async";
    el.alt = alt || "";
    if (cls) el.className = cls;
    guard(el, path || src, label || "asset goes here");
    el.src = src;
    return el;
  }

  /* ---------------------------------------------------------------------- */
  /* Drawn art for a tile with no cover image. Composes one of the wobbled   */
  /* splotches from js/doodles.js with the named line art, then tilts the    */
  /* whole thing a little so no two tiles look identically stamped.          */
  /* ---------------------------------------------------------------------- */
  var BLOB_COLOURS = ["var(--sticky-1)", "var(--sticky-2)", "var(--sticky-3)", "var(--sticky-4)"];

  function doodle(name, i, cls) {
    var lib = window.DOODLES;
    if (!lib || !lib.art) return null;                 // doodles.js didn't load
    var art = lib.art[name] || lib.art.scribble;
    if (!art) return null;

    var blob = lib.blobs[i % lib.blobs.length];
    var spin = [-4, 3, -2, 5, -3, 2][i % 6];

    var wrap = document.createElement("div");
    wrap.className = cls || "tile-doodle";
    wrap.style.setProperty("--blob", BLOB_COLOURS[i % BLOB_COLOURS.length]);
    wrap.innerHTML =
      '<svg viewBox="0 0 120 90" role="img" aria-hidden="true" focusable="false">' +
        '<g transform="rotate(' + spin + ' 60 45)">' +
          '<path class="d-blob" d="' + blob + '"/>' + art +
        "</g></svg>";
    return wrap;
  }

  /* ═══════════════════════════════════════════════════════ THE WALL ═══ */
  function renderProjects() {
    var mount = $("#workMount");
    mount.innerHTML = "";

    (D.projects || []).forEach(function (p, i) {
      var fig = document.createElement("figure");
      fig.className = "tile";   /* tile-gallery is added below, if there is more than one frame */
      fig.style.setProperty("--tilt", tilt(i));
      fig.dataset.index = i;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile-open";
      btn.setAttribute("aria-haspopup", "dialog");

      var art = document.createElement("div");
      art.className = "tile-art";

      /* Build the list of frames this tile can show.
         Frame 1: the cover image if set, else the drawing.
         Frames 2+: whatever `gallery` lists — each entry is either an image
         path (has a / or a .) or the name of a doodle from js/doodles.js. */
      var frames = [];
      var drawn = doodle(p.art, i);

      if (p.cover) {
        var cover = img(p.cover, p.title, p.cover, "cover art goes here");
        cover.className = "tile-img";
        /* a broken cover falls back to the drawing, not to a broken icon */
        if (drawn) {
          cover.addEventListener("error", function () {
            if (cover.parentNode) cover.parentNode.replaceChild(drawn, cover);
          }, { once: true });
        }
        frames.push(cover);
      } else if (drawn) {
        frames.push(drawn);
      } else {
        frames.push(placeholder("assets/work/" + p.slug + ".jpg", p.title));
      }

      (p.gallery || []).forEach(function (g, k) {
        var isPath = /[\/.]/.test(g);
        var node = isPath
          ? img(g, p.title, g, "gallery image goes here")
          : doodle(g, i + k + 1);
        if (node) {
          if (isPath) node.className = "tile-img";
          frames.push(node);
        }
      });

      /* Only a tile with something to cycle gets the gallery treatment. */
      if (frames.length > 1) {
        fig.classList.add("tile-gallery");
        frames.forEach(function (f, k) {
          f.classList.add("gal-frame");
          if (k === 0) f.classList.add("is-on");
          art.appendChild(f);
        });
      } else {
        fig.classList.remove("tile-gallery");
        art.appendChild(frames[0]);
      }

      var plate = document.createElement("figcaption");
      plate.className = "tile-plate";
      plate.innerHTML =
        "<h3>" + esc(p.title) + "</h3>" +
        (p.year ? '<span class="tile-year">' + esc(p.year) + "</span>" : "") +
        "<p>" + esc(p.hook) + "</p>";

      btn.appendChild(art);
      btn.appendChild(plate);
      fig.appendChild(btn);

      /* Fallback: before enhance.js upgrades these tiles to a modal, and if it
         never does, the long description is a working <details>. */
      if (p.about) {
        var det = document.createElement("details");
        det.className = "tile-fallback";
        det.innerHTML = "<summary>read more</summary><p>" + esc(p.about) + "</p>";
        fig.appendChild(det);
      }

      mount.appendChild(fig);
    });
  }

  /* ══════════════════════════════════════════════════════ THE CREW ═══ */

  var SPEAKER_OFF =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/>' +
    '<path d="M17 9l4 6M21 9l-4 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
  var SPEAKER_ON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/>' +
    '<path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none"/></svg>';

  /* Builds the video frame, including the failure state the brief asked for. */
  function buildReel(person) {
    var reel = document.createElement("div");
    reel.className = "reel";

    var v = document.createElement("video");
    v.muted = true;                       // required for any chance of autoplay
    v.loop = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("muted", "");
    v.preload = "none";                   // nothing downloads until it's needed
    if (person.poster) v.poster = person.poster;
    v.dataset.src = person.video;
    v.setAttribute("aria-label", "Clip of " + (person.name || "crew member"));

    var sound = document.createElement("button");
    sound.type = "button";
    sound.className = "sound-btn";
    sound.setAttribute("aria-pressed", "false");
    sound.setAttribute("aria-label", "Unmute clip");
    sound.innerHTML = SPEAKER_OFF;
    sound.addEventListener("click", function (e) {
      e.stopPropagation();
      v.muted = !v.muted;
      sound.setAttribute("aria-pressed", String(!v.muted));
      sound.setAttribute("aria-label", v.muted ? "Unmute clip" : "Mute clip");
      sound.innerHTML = v.muted ? SPEAKER_OFF : SPEAKER_ON;
      if (!v.muted && v.paused) safePlay(v);
    });

    /* Clips fail more often than anyone expects — wrong path, bad encode,
       flaky connection. Say so plainly and offer a way out. */
    v.addEventListener("error", function () {
      var fail = document.createElement("div");
      fail.className = "reel-fail";
      fail.innerHTML =
        "<p>the clip didn't load</p>" +
        '<button type="button">try again</button>' +
        '<a href="' + esc(person.video) + '">open the file directly</a>';
      fail.querySelector("button").addEventListener("click", function (e) {
        e.stopPropagation();
        var fresh = buildReel(person);
        fresh.querySelector("video").src = person.video;   // retry immediately
        fail.parentNode.replaceChild(fresh, fail);
      });
      if (reel.parentNode) reel.parentNode.replaceChild(fail, reel);
    });

    reel.appendChild(v);
    reel.appendChild(sound);
    return reel;
  }

  function renderCrew() {
    var mount = $("#crewMount");
    var people = D.crew || [];
    mount.innerHTML = "";
    mount.style.setProperty("--n", people.length);

    people.forEach(function (person, i) {
      var card = document.createElement("article");
      card.className = "crew-card";
      card.style.setProperty("--i", i);
      card.style.setProperty("--tilt", tilt(i + 2));

      var inner = document.createElement("div");
      inner.className = "card-inner";

      /* front */
      var front = document.createElement("div");
      front.className = "card-face card-front";
      var pw = document.createElement("div");
      pw.className = "card-portrait";
      pw.appendChild(person.portrait
        ? img(person.portrait, person.name, person.portrait, "portrait goes here")
        : placeholder("assets/crew/" + person.slug + ".jpg", "portrait"));
      front.appendChild(pw);
      var meta = document.createElement("div");
      meta.innerHTML =
        '<p class="card-role">' + esc(person.role) + "</p>" +
        '<h3 class="card-name">' + esc(person.name) + "</h3>" +
        (person.stat ? '<p class="card-stat">' + esc(person.stat) + "</p>" : "") +
        (person.since ? '<span class="card-since">since ' + esc(person.since) + "</span>" : "");
      front.appendChild(meta);

      /* back */
      var back = document.createElement("div");
      back.className = "card-face card-back";
      if (person.video) {
        back.appendChild(buildReel(person));
      } else if (person.photo) {
        back.appendChild(img(person.photo, person.name, person.photo, "photo goes here"));
      } else {
        back.appendChild(placeholder("assets/crew/" + person.slug + "-clip.mp4", "clip"));
      }
      var caption = document.createElement("p");
      caption.className = "card-stat";
      caption.textContent = person.name;
      back.appendChild(caption);

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      mount.appendChild(card);
    });

    lazyVideos();
  }

  /* Attach video sources only as they come near the viewport. */
  function lazyVideos() {
    var vids = document.querySelectorAll("video[data-src]");
    if (!vids.length) return;
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(vids, function (v) { v.src = v.dataset.src; });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.src = en.target.dataset.src;
        delete en.target.dataset.src;
        obs.unobserve(en.target);
      });
    }, { rootMargin: "300px" });
    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
  }

  /* ══════════════════════════════════════════════════════ SCRIBBLES ═══ */
  function renderScribbles() {
    var mount = $("#scribbleMount");
    mount.innerHTML = "";
    (D.scribbles || []).forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "scrib";
      b.style.setProperty("--tilt", tilt(i + 4));
      b.dataset.index = i;
      var fig = document.createElement("figure");
      fig.style.margin = "0";
      fig.appendChild(img(s.src, s.alt || s.caption, s.src, "drawing goes here"));
      if (s.caption) {
        var c = document.createElement("figcaption");
        c.textContent = s.caption;
        fig.appendChild(c);
      }
      b.appendChild(fig);
      mount.appendChild(b);
    });
  }

  /* ═══════════════════════════════════════════════════ ACHIEVEMENTS ═══ */
  function renderAchievements() {
    $("#achMount").innerHTML = (D.achievements || []).map(function (a, i) {
      var tier = ["gold", "silver", "bronze", "ink"].indexOf(a.tier) !== -1 ? a.tier : "bronze";
      return '<article class="trophy" style="--tilt:' + tilt(i + 1) + '">' +
        '<div class="medal ' + tier + '" aria-hidden="true"></div>' +
        "<h3>" + esc(a.title) + "</h3>" +
        "<p>" + esc(a.org) + (a.year ? '<span class="yr">' + esc(a.year) + "</span>" : "") + "</p>" +
        "</article>";
    }).join("");
  }

  /* ═════════════════════════════════════════════════════════ SKILLS ═══ */
  function renderSkills() {
    $("#skillMount").innerHTML = (D.skills || []).map(function (g) {
      var items = (g.items || []).map(function (s, j) {
        return '<li style="--tilt:' + tilt(j + 3) + '">' + esc(s) + "</li>";
      }).join("");
      return '<div class="skill-group"><h3>' + esc(g.group) + "</h3><ul>" + items + "</ul></div>";
    }).join("");
  }

  /* ══════════════════════════════════════════════════════ EDUCATION ═══ */
  function renderEducation() {
    $("#eduMount").innerHTML = (D.education || []).map(function (e, i) {
      return '<article class="index-card" style="--tilt:' + tilt(i + 5) + '">' +
        "<h3>" + esc(e.school) + "</h3>" +
        '<p class="cred">' + esc(e.credential) + "</p>" +
        '<span class="when">' + esc(e.when) + "</span>" +
        (e.detail ? '<p class="detail">' + esc(e.detail) + "</p>" : "") +
        "</article>";
    }).join("");
  }

  /* ════════════════════════════════════════════════════ BEYOND CODE ═══ */
  function renderBeyond() {
    $("#beyondMount").innerHTML = (D.beyond || []).map(function (b, i) {
      return '<article class="note" style="--tilt:' + tilt(i + 6) + '">' +
        "<h3>" + esc(b.title) + "</h3>" +
        (b.note ? "<p>" + esc(b.note) + "</p>" : "") +
        "</article>";
    }).join("");
  }

  /* ═══════════════════════════════════════════════════════════ HERO ═══ */
  /* Both of these have a drawn stand-in, so the site is complete with zero
     image files. Drop in doodle-01.png / doodle-10.png and yours wins. */
  function guardHero() {
    var h = document.getElementById("heroDoodle");
    if (h) {
      var stand = doodle("avatar", 0, "hero-doodle");
      h.addEventListener("error", function () {
        if (!h.parentNode) return;
        h.parentNode.replaceChild(
          stand || placeholder("assets/art/doodle-01.png", "your self-portrait doodle"), h);
      }, { once: true });
    }

    var g = document.querySelector(".payoff-guy img");
    if (g) {
      var beast = doodle("creature", 1, "payoff-doodle");
      g.addEventListener("error", function () {
        if (!g.parentNode) return;
        g.parentNode.replaceChild(
          beast || placeholder("assets/art/doodle-10.png", "the creature"), g);
      }, { once: true });
    }
  }

  /* Each step is isolated: one failure can't blank the page. */
  [guardHero, renderProjects, renderCrew, renderScribbles,
   renderAchievements, renderSkills, renderEducation, renderBeyond]
  .forEach(function (fn) {
    try { fn(); } catch (err) { console.error(fn.name + " failed:", err); }
  });
})();
