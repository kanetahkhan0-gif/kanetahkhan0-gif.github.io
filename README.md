# Kanetah Khan — portfolio

Ink on paper. Plain HTML, CSS and vanilla JavaScript — no framework, no npm, no
build step. Clone it, open `index.html`, done.

**Live:** https://kanetahkhan.github.io *(update once Pages is on)*

---

## Before you publish

Three things, all marked `⚠ TODO` in the files:

1. ~~LinkedIn URL~~ — done, wired into `index.html` in both the hero and the
   footer. Worth a minute though: your profile URL still has LinkedIn's
   auto-generated number on the end. Settings → Edit public profile & URL lets
   you claim a clean one, and `linkedin.com/in/kanetah-khan` reads far better
   on a portfolio than `…-572257394`. If you change it, update both spots in
   `index.html`.
2. **Crew names** — the four cards in `data.js` are templates. The role titles
   and stat lines are examples you can keep or rewrite, but every `name` says
   "Name goes here". Also: **ask each person before you put their face, their
   voice and an invented job title on a public page.**
3. **Achievement years** — only Solvio has one. Blank years just don't render,
   so nothing is broken without them.

**You need no image files at all.** The Wall, the hero portrait and the payoff
creature are all drawn in code — 15 SVG illustrations in `js/doodles.js`, one
per project plus stand-ins. Crew portraits and your Scribbles still show a box
naming the expected file, because those are your own photos and drawings and
nothing can stand in for them. Every path is listed in the READMEs inside
`assets/`.

---

## File tree

```
.
├── index.html            document skeleton + the hero (see "the one exception")
├── data.js           ←   every growable collection. This is the file you edit.
├── css/
│   ├── base.css          type, spacing, layout — a readable page on its own
│   └── decor.css         paper, tape, frames, torn edges, the fan
├── js/
│   ├── doodles.js        15 SVG illustrations — the art, drawn in code
│   ├── render.js         writes semantic markup from data.js
│   └── enhance.js        optional layer: modal, flip, gallery, lightbox, payoff
├── assets/
│   ├── art/              10 doodles — README says exactly what to draw
│   ├── work/             project covers (all optional)
│   ├── crew/             portraits, clips, posters
│   ├── scribbles/        drawings
│   └── cv.pdf            optional
├── .nojekyll
├── README.md
└── AI-PROMPTS.md         AI tool disclosure (assignment deliverable)
```

---

## The one exception to "all content in data.js"

You asked for two things that pull against each other:

> ALL content lives in one data.js
> …
> If JS fails, the site must still be readable.

Anything rendered from `data.js` needs JavaScript to exist. Both can't be
absolutely true, so here's where the line got drawn:

- **In `index.html`:** your name, role, the bio, the contact row, and every
  section heading. This is the 5% that must never vanish — and it's the graded
  requirement. It's also the part that doesn't grow.
- **In `data.js`:** projects, crew, scribbles, achievements, skills, education,
  beyond-code, payoff lines. The 95% that grows over the next two years.

Adding a project is still one appended object, which is what you actually
wanted. To edit the bio or contact details, open `index.html` and look for the
block marked `EDIT ME`.

---

## Build order, and what survives what

Four layers, each usable without the one above it:

| Layer | If it's missing you get |
|-------|------------------------|
| `index.html` alone | Name, bio with the correction gag, contact links, every heading |
| `+ base.css` | A clean, well-set document |
| `+ render.js` | All content, as semantic HTML: figures, lists, working `<details>` |
| `+ decor.css` `+ enhance.js` | Paper, frames, the fan, the modal, the payoff |

This is enforced, not aspirational. Two specific mechanisms:

**Nothing is hidden by CSS unless the script that reveals it is confirmed
alive.** `enhance.js` sets `html.js-modal` only after the modal's listeners
attach, and `html.js` only after every crew card can flip. Until then the
project long-copy is a real `<details>` and both card faces are stacked and
visible. Kill `enhance.js` and nothing disappears.

**Content-critical behaviour lives in `render.js`, not `enhance.js`.** Lazy
video loading, the sound toggle and the clip-failure fallback are all in the
content layer, so a crew clip still plays and still fails gracefully even if the
enhancement layer never runs.

Verified by deleting the `enhance.js` script tag and re-testing: 12 working
`<details>`, 4 card backs visible, sound buttons live, nothing hidden.

---

## Adding things later

You're in your fourth semester. The site has to absorb two more years without a
rewrite. Everything is a loop over an array in `data.js`:

```js
// append to SITE.projects
{
  slug:  "next-thing",
  title: "Whatever you build next",
  hook:  "One line, shown on the nameplate.",
  year:  "2027",
  about: "The long version, shown in the modal.",
  tech:  ["Python", "PyTorch"],
  links: [{ label: "Repo", href: "https://github.com/KanetahKhan/next-thing" }]
}
```

That alone gets you: a framed tile with a hand-drawn hanging hook, a
deterministic tilt, tape corners, tech chips in the modal, and a `<details>`
fallback. Add `art: "rover"` (or any name from `js/doodles.js`) and it gets an
illustration too — no image file needed. Leave `art` off and it falls back to
the generic `scribble` drawing.

Same pattern for `crew` (the fan re-spaces itself for any number of cards),
`scribbles`, `achievements`, `skills`, `education`, `beyond` and `payoff`.
A whole new section takes four small edits, listed at the bottom of `data.js`.

---

## GitHub Pages setup

### Option A — user site at `kanetahkhan.github.io`

1. Create a **public** repo named exactly `KanetahKhan.github.io`.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/KanetahKhan/KanetahKhan.github.io.git
   git push -u origin main
   ```
3. **Settings → Pages → Source:** *Deploy from a branch*, branch `main`,
   folder `/ (root)`. Save.
4. Live at `https://kanetahkhan.github.io` in about a minute.

### Option B — project site, or serving from `/docs`

Name the repo anything (say `portfolio`) and either push to root as above, or
move everything into a `docs/` folder and pick **folder `/docs`** in the Pages
settings. The URL becomes `https://kanetahkhan.github.io/portfolio/`.

**Every path in this project is relative** (`css/base.css`, not `/css/base.css`).
That's what makes `/docs` and project sites work — absolute paths break the
moment the site stops living at the domain root.

### Custom domain

Add a file called `CNAME` containing only your domain, point a DNS `CNAME`
record at `kanetahkhan.github.io`, then set the domain under Settings → Pages
and tick **Enforce HTTPS**.

---

## Design notes

Off-grid on purpose. Cards, frames, sticky notes and index cards all carry a
tilt between -3° and 3°, derived from position so the angles never reshuffle
between renders. Paper grain is an inline SVG turbulence filter, the torn edge
above the payoff is a `clip-path`, the hanging hooks and the red underline
under each heading are inline SVG data URIs. No image files are used for any of
it, which is the whole point — you have one day and no asset budget.

Type: Shantell Sans for headings (a genuine marker face, not a marker
impression), Caveat for anything handwritten, Instrument Sans for body copy.
Body text is real text, never an image.

**The three borrowed moves:**

1. **The correction.** The bio reads "then ~~pray~~ debug until they do", with
   "pray" struck in red and "debug" scrawled above it. It's built from `<del>`
   and `<ins>` — the correct semantic pair for a correction — so the joke still
   reads as a correction with CSS switched off.
2. **The frames.** Project tiles hang from a drawn nail and wire, taped at two
   corners. Clicking opens a `<dialog>`, which gives focus trapping and Escape
   for free. CareerPilot cycles a gallery on hover, and auto-cycles on phones
   where hover doesn't exist.
3. **The payoff.** Past the footer, through a torn edge, a creature rises up and
   says something. Click it for the next line — eight of them, in `data.js`,
   and it wraps around.

**The deck.** On phones it's a scroll-snap strip, so swipe is the browser's
native behaviour rather than something reimplemented badly. At 900px and up it
becomes a fanned hand — the arc comes from rotating each card around an origin
well below it, spaced by `--i` and `--n` custom properties, so it re-spaces
itself for any number of cards. Arrow keys move between them; Enter and Space
flip. Cards are only given `role="button"` once something can actually flip
them.

**Reduced motion** is respected everywhere: the flip transition, the creature's
entrance and the gallery timer all switch off. The gallery still works for those
users — it advances one frame per hover instead of looping.

**Other details:** clips are muted, `playsinline`, `preload="none"`, and their
source isn't attached until the deck is within 300px of the viewport. Every
missing asset degrades to a labelled box. Keyboard focus is visible throughout.
No CDN dependencies except Google Fonts. Nothing is desktop-gated.

---

## AI use

Disclosed in [AI-PROMPTS.md](AI-PROMPTS.md), as the assignment requires.
