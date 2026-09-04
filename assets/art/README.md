# assets/art — the doodle brief

Ten drawings, used as accents. **Every single one is optional.**

The site ships with drawn stand-ins for the two that matter most: `doodle-01`
(the hero self-portrait) and `doodle-10` (the creature at the bottom) both fall
back to SVG drawings in `js/doodles.js`. Drop your PNG in and yours wins
immediately — no code change.

Draw them in black ink on white, **export as PNG with a transparent
background** so they sit on the paper rather than on a white rectangle.
Roughly 600–900px on the long edge is plenty.

Until a file exists the page draws a labelled box naming the missing path, so
nothing looks broken while you work through the list.

| File | What to draw | Where it appears | Needed? |
|------|--------------|------------------|---------|
| `doodle-01.png` | **Self-portrait.** Head and shoulders, loose, unflattering is funnier. This is the one people look at first, and the drawn stand-in is generic — this is the highest-value drawing you can make. | Hero, top right, taped at two corners | Stand-in exists |
| `doodle-02.png` | **A curving arrow** with a slight hook at the tip, pointing down-left. | Points at the contact row | Optional |
| `doodle-03.png` | **A scribbled asterisk / star burst**, four to six strokes. | Section accent, reusable anywhere | Optional |
| `doodle-04.png` | **A picture hook and nail**, drawn as if holding a frame. | The Wall — currently drawn in CSS; a hand-drawn one is better | Optional |
| `doodle-05.png` | **A mug with a coffee ring** under it. | Desk clutter near The Crew | Optional |
| `doodle-06.png` | **A wobbly underline**, one confident stroke with a bit of overshoot. | Under section headings — currently a CSS squiggle | Optional |
| `doodle-07.png` | **A small rover**, six wheels, mast, a bit lopsided. | The Wall, near Musafir | Optional |
| `doodle-08.png` | **A leaning stack of books** with a pen balanced on top. | Education | Optional |
| `doodle-09.png` | **A rosette or medal** with two ribbon tails. | Achievements shelf | Optional |
| `doodle-10.png` | **A small creature.** Round, two dots for eyes, mildly surprised. It rises over the torn edge at the very bottom and says a different line each time you click it. The stand-in is deliberately plain — yours should have personality, it's the reward for scrolling the whole page. | The scroll payoff, very bottom | Stand-in exists |

To place an optional doodle, drop an `<img>` where you want it and give it
`class="accent"`, or set it as a CSS `background-image`. They aren't wired into
`data.js` because they're decoration, not content — they don't grow, and they
don't belong in a data file.

## Other files in this folder

None. Project covers go in `assets/work/`, crew photos in `assets/crew/`,
drawings in `assets/scribbles/`.
