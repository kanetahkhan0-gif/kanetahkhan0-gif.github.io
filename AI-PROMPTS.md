# AI tool disclosure

Required by the assignment: the names of any AI tools used, and the history of
the prompts sent to them.

## Tools used

| Tool | Model | Interface | Used for |
|------|-------|-----------|----------|
| Claude | Claude Opus 5 (Anthropic) | claude.ai | Implementing the site — HTML, CSS, JavaScript, and the documentation |

No other AI tool was used. No template, theme or third-party portfolio
repository was adapted. The markup, stylesheets and scripts were written from
scratch against the specifications below.

---

## Prompt history

### Prompt 1 — the assignment brief

The IUT assignment sheet, pasted as-is: deliverables (public GitHub repo, hosted
domain link, AI-tool disclosure), requirements (identity and contact details
with email, GitHub and LinkedIn at minimum; projects, academic achievements and
research highlighted; a creative theme), the suggestion list (use GitHub Pages,
keep it extensible for the next two years, document work online, LLM use
permitted, adapting an open-source design permitted), the tutorial links, and
the example portfolios — Guido van Rossum, Paul Graham, Chris Olah and Andrej
Karpathy for minimal; Jackie Zhang and Gazi Jarin for fancy.

**Output:** a first draft in a typeset, document-like direction. Not used.

### Prompt 2 — notebook direction

My own specification for a cluttered-desk / sticker-covered-notebook theme with
a "brainrot mode" toggle, all content in a single `data.js`, and a fixed set of
sections.

**Output:** a complete site in that direction. Not used — superseded below.

### Prompt 3 — ink on paper (the current site)

A rewritten specification, mine, covering:

- **Stack:** static, no server, no build step, plain HTML/CSS/vanilla JS, works
  from `/docs` or root. All content in one `data.js`, appended one object at a
  time; extensibility is graded, so it has to be commented. **Build order: every
  section works as plain semantic HTML first, decoration layered on top — if JS
  fails the site must still be readable.** Responsive, with the card deck
  swipeable on a phone rather than hover-only. Videos with poster, lazy,
  muted, `playsinline`, `preload="none"`.
- **Visual language:** ink on paper, `#f7f6f1`, light only, faint grain,
  everything off-grid at -3° to 3°. Referenced tiagofragoso.com, but with the
  explicit constraint that he hand-drew every asset and I have one day — so
  simulate it cheaply with one marker display font, a clean sans, CSS-drawn
  tape, torn edges, sticky notes and shadows, and about ten of my own doodle
  PNGs as accents only. Body copy must never be rendered as images.
- **Three specific borrowed moves:** an ink strikethrough correcting a word
  mid-sentence in the bio; project tiles as drawn picture frames opening a
  modal, with one tile cycling a hover gallery; and a scroll payoff at the very
  bottom for anyone who made it there.
- **The Crew:** a character card deck referencing conceptcapers.com — portrait,
  name, invented role title, stat line, cards fanned like a held hand, flipping
  to a photo and a clip in a drawn frame with a custom unmute button, plus a
  required failure state with a retry and a direct file link.
- **Sections and content:** hero, The Wall (twelve projects with their technical
  details), The Crew, Scribbles, Achievements, Skills, Education, Beyond Code,
  footer with a "drawn by hand, coded with AI" badge, then the payoff.
- **Constraints:** no lorem ipsum, every expected asset path listed, no CDN
  dependencies except fonts, no desktop-only gating, and no phone number or home
  address anywhere on the site.

**Output:** this repository.

---

## What came from where

**Mine:** the design direction and every constraint above, all twelve project
descriptions and their technical details, the achievement list, skills,
education history, extracurriculars, the crew, and every drawing, cover and clip
in `assets/`.

**The model's:** the implementation — the CSS for the paper surface, frames,
torn edges and the card fan; the rendering and enhancement layers; the modal,
flip, gallery, lightbox and payoff logic; and the prose in the README files.

**Decided together:** the brief asked for all content in `data.js` *and* for the
site to stay readable when JS fails, which can't both be fully true. The model
flagged the conflict rather than silently picking one, and the resolution — hero
and headings hardcoded in `index.html`, growable collections in `data.js` — is
documented in the README and in a comment at the top of `data.js`.

**Checked by me:** every factual claim on the site, the contact links, crew
consent, and the deployment.

---

## Log format for future edits

Append here as the site grows, so the disclosure stays accurate:

### Prompt N — DD Month YYYY
- **Tool:** name and model
- **Prompt:** what was asked
- **Output used:** what was kept, and what was changed by hand
