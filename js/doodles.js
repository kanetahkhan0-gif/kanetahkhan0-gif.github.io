/* ============================================================================
   doodles.js — drawn-in-code art for The Wall.

   A project tile shows, in order of preference:
     1. its `cover` image, if one is set in data.js and the file loads
     2. the doodle named by its `art` key (this file)
     3. a labelled box naming the missing file (only if this file didn't load)

   So you never need a single photograph for the site to look finished.
   Every doodle is line art in the same ink-on-paper language as the rest of
   the page: black strokes, a coloured blob behind, drawn on a 120×90 canvas
   so it fills the 4:3 frame.

   ── TO ADD ONE ─────────────────────────────────────────────────────────────
   Add a key below whose value is the inner markup of an SVG. Use:
       class="d-ink"   stroked line art — no fill, black stroke
       class="d-fill"  solid black shapes (eyes, dots, small triangles)
   Then point a project at it in data.js with  art: "your-key".

   Don't include the colour splotch — render.js adds one of the `blobs` below
   automatically, along with the colour and a slight rotation, so no two tiles
   look stamped from the same die.

   No SVG filters are used. The wobble is baked into the path data: a filter
   that silently no-ops in one browser would leave the art looking different
   there than everywhere else.
   ============================================================================ */

window.DOODLES = {

  /* Hand-wobbled splotches, cycled per tile. Deliberately not ellipses — a
     perfect circle behind every drawing is what makes a set of these read as
     clip art instead of stickers. */
  blobs: [
    "M58 11C81 9 100 24 96 45 92 65 75 79 55 76 35 73 21 59 23 41 25 23 38 13 58 11Z",
    "M63 14C85 17 99 31 94 49 89 67 70 80 50 75 31 70 20 55 24 37 28 20 44 12 63 14Z",
    "M55 12C78 8 98 26 95 47 92 67 72 81 52 77 33 73 20 57 24 39 28 22 35 14 55 12Z",
    "M60 10C84 12 98 28 95 47 92 66 78 80 56 78 35 76 22 60 24 40 26 21 40 9 60 10Z"
  ],

  art: {

    /* a robot telling a lie — Bengali LLM Hallucination Detection */
    "robot-lie":
      '<path class="d-ink" d="M44 44h32a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H44a4 4 0 0 1-4-4V48a4 4 0 0 1 4-4z"/>' +
      '<path class="d-ink" d="M60 44v-5"/>' +
      '<circle class="d-fill" cx="60" cy="36" r="3"/>' +
      '<circle class="d-fill" cx="51" cy="54" r="2.6"/>' +
      '<circle class="d-fill" cx="69" cy="54" r="2.6"/>' +
      '<path class="d-ink" d="M52 63q8 4 16 0"/>' +
      '<path class="d-ink" d="M40 52h-5M80 52h5"/>' +
      '<path class="d-ink" d="M74 16h26a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-14l-7 6 1-6h-6a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z"/>' +
      '<path class="d-ink" d="M80 26q4-5 8 0t8 0"/>',

    /* six-wheeled rover — Musafir */
    "rover":
      '<path class="d-ink" d="M34 48h50v13H34z"/>' +
      '<path class="d-ink" d="M28 44h62"/>' +
      '<circle class="d-ink" cx="42" cy="67" r="6"/>' +
      '<circle class="d-ink" cx="59" cy="67" r="6"/>' +
      '<circle class="d-ink" cx="76" cy="67" r="6"/>' +
      '<path class="d-ink" d="M72 48V33"/>' +
      '<path class="d-ink" d="M65 24h14v9H65z"/>' +
      '<circle class="d-fill" cx="72" cy="28.5" r="2"/>' +
      '<path class="d-ink" d="M42 48v-9l7 3-7 3"/>',

    /* paper plane on a dotted course — CareerPilot */
    "plane":
      '<path class="d-ink" d="M32 56l60-28-19 38-11-13z"/>' +
      '<path class="d-ink" d="M32 56l30-3"/>' +
      '<path class="d-ink" d="M24 70q16 6 28-3" stroke-dasharray="3 5"/>' +
      '<path class="d-ink" d="M92 62l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>' +
      '<path class="d-ink" d="M30 26l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/>',

    /* a robot that hunts by sound — Silent Hallway Chase */
    "soundbot":
      '<path class="d-ink" d="M42 36h30a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H42a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4z"/>' +
      '<path class="d-ink" d="M49 46l8 8M57 46l-8 8"/>' +
      '<path class="d-ink" d="M63 46l8 8M71 46l-8 8"/>' +
      '<path class="d-ink" d="M46 66v9M68 66v9"/>' +
      '<path class="d-ink" d="M84 44q6 8 0 16M91 39q10 13 0 26"/>',

    /* handheld with a companion pet — Acadence */
    "pet":
      '<path class="d-ink" d="M44 24h32a5 5 0 0 1 5 5v37a5 5 0 0 1-5 5H44a5 5 0 0 1-5-5V29a5 5 0 0 1 5-5z"/>' +
      '<path class="d-ink" d="M46 32h28v24H46z"/>' +
      '<path class="d-ink" d="M54 52q0-11 6-11t6 11z"/>' +
      '<circle class="d-fill" cx="57.5" cy="45" r="1.6"/>' +
      '<circle class="d-fill" cx="62.5" cy="45" r="1.6"/>' +
      '<circle class="d-ink" cx="49" cy="63" r="2.6"/>' +
      '<circle class="d-ink" cx="60" cy="63" r="2.6"/>' +
      '<circle class="d-ink" cx="71" cy="63" r="2.6"/>',

    /* a booked desk, under lock — CoWork */
    "desk":
      '<path class="d-ink" d="M26 56h64"/>' +
      '<path class="d-ink" d="M33 56v16M83 56v16"/>' +
      '<path class="d-ink" d="M46 56l6-15h16l6 15z"/>' +
      '<path class="d-ink" d="M50 49h16"/>' +
      '<path class="d-ink" d="M76 30h14v13H76z"/>' +
      '<path class="d-ink" d="M79 30v-4a4 4 0 0 1 8 0v4"/>' +
      '<circle class="d-fill" cx="83" cy="36" r="1.8"/>',

    /* open book, searched — Metra */
    "book-search":
      '<path class="d-ink" d="M28 62q14-7 28 0 14-7 28 0V42q-14-7-28 0-14-7-28 0z"/>' +
      '<path class="d-ink" d="M56 42v20"/>' +
      '<circle class="d-ink" cx="78" cy="32" r="9"/>' +
      '<path class="d-ink" d="M85 39l8 8"/>',

    /* gamepad — Unwind */
    "controller":
      '<path class="d-ink" d="M40 42q-9 9-5 20 4 9 12 2l4-4h18l4 4q8 7 12-2 4-11-5-20-7-6-15-4H55q-8-2-15 4z"/>' +
      '<path class="d-ink" d="M45 54h9M49.5 49.5v9"/>' +
      '<circle class="d-fill" cx="72" cy="51" r="3"/>' +
      '<circle class="d-fill" cx="79" cy="57" r="3"/>',

    /* seven-segment clock with an alarm — Digital Clock System */
    "clock":
      '<path class="d-ink" d="M28 34h64a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V38a4 4 0 0 1 4-4z"/>' +
      '<path class="d-ink" d="M33 42h9v14h-9zM45 42h9v14h-9z"/>' +
      '<circle class="d-fill" cx="59" cy="46" r="1.8"/>' +
      '<circle class="d-fill" cx="59" cy="53" r="1.8"/>' +
      '<path class="d-ink" d="M64 42h9v14h-9zM76 42h9v14h-9z"/>' +
      '<path class="d-ink" d="M52 34q4-8 8 0"/>' +
      '<path class="d-ink" d="M24 66q-4 6 0 8M96 66q4 6 0 8"/>',

    /* campus building — CampusHub */
    "building":
      '<path class="d-ink" d="M34 44h52v28H34z"/>' +
      '<path class="d-ink" d="M28 44l32-16 32 16"/>' +
      '<path class="d-ink" d="M54 58h12v14H54z"/>' +
      '<path class="d-ink" d="M40 52h8v7h-8zM72 52h8v7h-8z"/>' +
      '<path class="d-ink" d="M60 28v-9l9 3-9 3"/>',

    /* a song in a bottle — TuneBottle */
    "bottle":
      '<path class="d-ink" d="M53 26h14v8l6 9v25a4 4 0 0 1-4 4H51a4 4 0 0 1-4-4V43l6-9z"/>' +
      '<path class="d-ink" d="M51 26h18"/>' +
      '<path class="d-ink" d="M57 60V48l9-3v12"/>' +
      '<circle class="d-fill" cx="54" cy="61" r="3.2"/>' +
      '<circle class="d-fill" cx="63" cy="58" r="3.2"/>' +
      '<path class="d-ink" d="M26 78q7-4 14 0t14 0 14 0 14 0"/>',

    /* companion creature — Melo */
    "cat":
      '<circle class="d-ink" cx="60" cy="48" r="18"/>' +
      '<path class="d-ink" d="M47 36l-5-12 13 6M73 36l5-12-13 6"/>' +
      '<circle class="d-fill" cx="53" cy="46" r="2.6"/>' +
      '<circle class="d-fill" cx="67" cy="46" r="2.6"/>' +
      '<path class="d-fill" d="M58 52h4l-2 3z"/>' +
      '<path class="d-ink" d="M54 56q6 5 12 0"/>' +
      '<path class="d-ink" d="M41 47H30M41 52H30M79 47h11M79 52h11"/>',

    /* stand-in self-portrait for the hero, until you draw doodle-01.png */
    "avatar":
      '<path class="d-ink" d="M60 22c11 0 18 8 18 19 0 12-8 21-18 21s-18-9-18-21c0-11 7-19 18-19z"/>' +
      '<path class="d-ink" d="M41 40q-3-18 19-19 22 1 19 19"/>' +
      '<path class="d-ink" d="M41 40q-4 8 1 12M79 40q4 8-1 12"/>' +
      '<circle class="d-fill" cx="53" cy="43" r="2.4"/>' +
      '<circle class="d-fill" cx="67" cy="43" r="2.4"/>' +
      '<path class="d-ink" d="M55 51q5 4 10 0"/>' +
      '<path class="d-ink" d="M33 84q3-17 27-19 24 2 27 19"/>' +
      '<path class="d-ink" d="M74 27l9-8"/>' +
      '<path class="d-ink" d="M83 19l4-3 2 3-3 3z"/>',

    /* the creature at the very bottom, until you draw doodle-10.png */
    "creature":
      '<path class="d-ink" d="M60 22c17 0 27 13 27 29 0 15-11 26-27 26s-27-11-27-26c0-16 10-29 27-29z"/>' +
      '<circle class="d-fill" cx="51" cy="46" r="3.4"/>' +
      '<circle class="d-fill" cx="69" cy="46" r="3.4"/>' +
      '<path class="d-ink" d="M55 58q5 6 10 0"/>' +
      '<path class="d-ink" d="M45 27l-4-9M75 27l4-9"/>' +
      '<circle class="d-fill" cx="40" cy="16" r="2.6"/>' +
      '<circle class="d-fill" cx="80" cy="16" r="2.6"/>' +
      '<path class="d-ink" d="M33 52q-7 3-9 9M87 52q7 3 9 9"/>' +
      '<path class="d-ink" d="M51 77v7M69 77v7"/>',

    /* generic fallback — a framed scribble, used when `art` is unset */
    "scribble":
      '<path class="d-ink" d="M34 58q8-22 16-6t16-10 16 12"/>' +
      '<path class="d-ink" d="M32 68h56" stroke-dasharray="4 6"/>' +
      '<circle class="d-fill" cx="40" cy="34" r="2.4"/>' +
      '<circle class="d-fill" cx="82" cy="30" r="2.4"/>'
  }
};
