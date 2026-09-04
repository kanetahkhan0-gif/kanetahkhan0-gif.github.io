/* ============================================================================
   data.js — THE ONLY FILE YOU EDIT TO ADD CONTENT.
   ============================================================================

   Every repeating thing on this site is a loop over an array below.
   Append one object, save, refresh. No build step, nothing else to touch.

     SITE.projects      → The Wall (framed tiles + modal)
     SITE.crew          → The Crew (flippable trading cards)
     SITE.scribbles     → Scribbles (pinned drawings, lightbox)
     SITE.achievements  → the trophy shelf
     SITE.skills        → grouped skill list
     SITE.education     → index cards
     SITE.beyond        → sticky notes
     SITE.payoff        → the lines the creature says at the bottom

   ── ONE DELIBERATE EXCEPTION ────────────────────────────────────────────────
   Your name, role, bio and contact row are NOT here — they are written as
   plain HTML in index.html.

   You asked for two things that pull against each other: all content in this
   file, and a site that stays readable when JS fails. Anything rendered from
   this file needs JS to exist. So the 5% that must never fail — who you are
   and how to reach you, which is also the graded requirement — is hardcoded
   in the HTML, and the 95% that grows over the next two years lives here.
   Adding a project is still one appended object, which is what you actually
   asked for. To edit the bio or contact row, open index.html and look for
   the block marked EDIT ME.
   ============================================================================ */

const SITE = {

  /* ── SECTION HEADINGS live in index.html, not here ───────────────────────
     Same reason as the bio and contact row above: headings are the document's
     skeleton. With JS off you should still get a correctly structured page —
     h1, then every h2 in order — rather than a blank sheet. They're chrome,
     not content, and they don't grow. Edit them in index.html.
     ─────────────────────────────────────────────────────────────────────── */

  /* ══════════════════════════════════════════════════════════════════════════
     PROJECTS — each becomes a framed tile on The Wall. Click opens a modal.

     {
       slug:  "short-id",              // used for the cover image filename
       title: "Project name",
       hook:  "One line, shown on the nameplate under the frame.",
       year:  "2026",
       about: "The long version, shown in the modal.",
       tech:  ["Python", "PyTorch"],   // chips in the modal
       links: [{ label: "Repo", href: "https://github.com/..." }],
       art:   "rover",                      // a drawing from js/doodles.js
       cover: "assets/work/short-id.jpg",   // OPTIONAL — a real image, wins over art
       gallery: ["desk", "b.jpg"]           // OPTIONAL — cycles on hover;
                                            //   doodle names OR image paths
     }

     YOU DON'T NEED ANY IMAGES. Each tile draws the illustration named by its
     `art` key — those live in js/doodles.js, they're pure SVG, and there are
     13 to choose from: robot-lie, rover, plane, soundbot, pet, desk,
     book-search, controller, clock, building, bottle, cat, scribble.

     If you later make a real screenshot or photo, add a `cover` key pointing
     at it and that wins. If the file is ever missing or fails to load, the
     tile quietly falls back to the doodle rather than breaking.

     GALLERY: exactly one tile should have this — it cycles images on hover
     (and auto-cycles on phones, where hover doesn't exist). It's on
     CareerPilot below. Move it by moving the `gallery` key.
     ═══════════════════════════════════════════════════════════════════════ */
  projects: [
    {
      slug:  "hallucination",
      title: "Bengali LLM Hallucination Detection",
      hook:  "Catching a model inventing facts, in a language nobody built the tooling for",
      year:  "2026",
      art:   "robot-lie",
      about: "Built with team TutuAli for the IUT ICT Fest Kaggle datathon. The system decides " +
             "whether a Bengali model answer is actually supported by its source passage or quietly " +
             "made up. Qwen3-32B served through vLLM acts as the judge, mDeBERTa handles the natural " +
             "language inference, and a Bangla BM25 index does retrieval for the grounded cases. " +
             "QLoRA fine-tuning on top, then a stacking ensemble over the lot. Around 0.858 F1. " +
             "Most of the real work was in evaluation design rather than modelling — Bengali " +
             "normalisation bugs will wreck your routing silently and never throw an error.",
      tech:  ["Python", "vLLM", "PyTorch", "NLP", "QLoRA", "BM25"],
      links: []
    },
    {
      slug:  "musafir",
      title: "Musafir — Team Altair Rover",
      hook:  "Teaching a rover to cross a desert without being told how",
      year:  "2026",
      art:   "rover",
      about: "Team Altair's entry for the University Rover Challenge. I worked on the autonomy " +
             "stack: ROS2 nodes for navigation, GPS waypoint following, YOLO detection for the " +
             "equipment-servicing and delivery tasks, and waypoint ordering so the rover stops " +
             "driving stupid routes between targets.",
      tech:  ["ROS", "Python", "YOLO", "Robotics"],
      links: []
    },
    {
      slug:  "careerpilot",
      title: "CareerPilot",
      hook:  "An AI career co-pilot that reads your CV and argues with it",
      year:  "2026",
      art:   "plane",
      /* THE HOVER-GALLERY TILE. Each entry is either a doodle name (from
         js/doodles.js) or an image path — anything containing a / or a . is
         treated as a file. So this works right now with no screenshots, and
         you can swap in real ones later by replacing these three strings
         with paths. Move the whole `gallery` key to move the feature. */
      gallery: ["book-search", "desk", "controller"],
      about: "Built for DevSprint 2026 and Poridhi CodeSprint. Next.js front end, Supabase with " +
             "pgvector for retrieval-augmented answers over your own documents, tool-calling agents " +
             "that take actions rather than just chat, and a Kanban board for tracking applications " +
             "through their stages.",
      tech:  ["Next.js", "Supabase", "RAG", "JavaScript", "Agents"],
      links: []
    },
    {
      slug:  "silent-hallway",
      title: "Silent Hallway Chase",
      hook:  "A 3D stealth game where the thing hunting you can't see — it listens",
      year:  "2026",
      art:   "soundbot",
      about: "libGDX, and almost nothing off the shelf. Level geometry is generated procedurally, " +
             "the audio is synthesized as raw PCM at runtime instead of loaded from files, and the " +
             "robot runs a finite state machine that switches between patrol, investigate and pursue " +
             "based on the noise you make. Three mini-games are embedded in the run.",
      tech:  ["Java", "libGDX", "Game Dev", "Audio DSP"],
      links: []
    },
    {
      slug:  "acadence",
      title: "Acadence",
      hook:  "A study assistant with a Tamagotchi that judges your habits",
      year:  "2025",
      art:   "pet",
      about: "Qt6 and C++. Routine management, reminders, and a companion pet whose mood tracks how " +
             "well you're keeping up with your own schedule. Written as an exercise in applying " +
             "design patterns properly instead of reading about them.",
      tech:  ["C++", "Qt6", "Design Patterns"],
      links: []
    },
    {
      slug:  "cowork",
      title: "CoWork",
      hook:  "A booking API that refuses to double-book a desk, even under load",
      year:  "2025",
      art:   "desk",
      about: "FastAPI and SQLite. JWT authentication, per-tenant isolation, rate limiting, and " +
             "concurrency-safe overlap detection so two people hitting the endpoint in the same " +
             "millisecond can't both reserve the same slot.",
      tech:  ["Python", "FastAPI", "SQL", "Backend"],
      links: []
    },
    {
      slug:  "metra",
      title: "Metra",
      hook:  "An edtech site where the search box actually answers the question",
      year:  "2025",
      art:   "book-search",
      about: "AI-powered search and Q&A over course material, plus video calling and group chat so " +
             "study groups don't have to leave the platform to talk to each other.",
      tech:  ["JavaScript", "WebRTC", "HTML/CSS", "AI"],
      links: []
    },
    {
      slug:  "unwind",
      title: "Unwind",
      hook:  "Three mini-games in a console window, for when the lab PC has nothing installed",
      year:  "2025",
      art:   "controller",
      about: "A Raylib console game bundling three small games behind one menu. Built to learn the " +
             "render loop and input handling from the bottom up.",
      tech:  ["C", "Raylib", "Game Dev"],
      links: []
    },
    {
      slug:  "digital-clock",
      title: "Digital Clock System",
      hook:  "A clock built from logic gates, with a password so nobody else can set it",
      year:  "2025",
      art:   "clock",
      about: "Digital Logic Design project, simulated in Proteus. Seven-segment HH:MM:SS display, " +
             "automatic rollover at every boundary, 12/24-hour switching, an admin mode gated behind " +
             "a password before the time can be changed, and a buzzer plus LED alarm.",
      tech:  ["Proteus", "Digital Logic", "Hardware"],
      links: []
    },
    {
      slug:  "campushub",
      title: "CampusHub",
      hook:  "A campus site, front end only, built before I knew what a backend was for",
      year:  "2024",
      art:   "building",
      about: "Pure HTML and CSS. Kept here because it's an honest marker of where the layout skills " +
             "started.",
      tech:  ["HTML/CSS", "JavaScript"],
      links: []
    },
    {
      slug:  "tunebottle",
      title: "TuneBottle",
      hook:  "Send a song to a stranger. No names, no profiles, no replies unless they want to",
      year:  "2024",
      art:   "bottle",
      about: "An anonymous music pen-pal app — you put a track in a bottle, someone else opens it.",
      tech:  ["JavaScript", "HTML/CSS"],
      links: []
    },
    {
      slug:  "melo",
      title: "Melo",
      hook:  "A virtual companion pet that expects to be fed",
      year:  "2024",
      art:   "cat",
      about: "A small virtual pet app: states, needs, decay over time, and the guilt that follows.",
      tech:  ["JavaScript", "HTML/CSS"],
      links: []
    }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     THE CREW — trading cards. Front is the portrait, role and stat line;
     flip for the photo and their clip.

     {
       slug:    "short-id",                       // used for filenames
       name:    "Their name",
       role:    "The made-up job title",
       stat:    "One line, or a stat, or an in-joke",
       since:   "2023",                           // optional, small print
       portrait:"assets/crew/short-id.jpg",       // card front
       photo:   "assets/crew/short-id-photo.jpg", // card back
       video:   "assets/crew/short-id-clip.mp4",  // optional
       poster:  "assets/crew/short-id-poster.jpg" // shown before the clip loads
     }

     ⚠ TODO: the four cards below are TEMPLATES. The role titles and stat
     lines are examples — keep them if they fit, rewrite them if they don't,
     but replace every `name` before you publish. Delete any card you don't
     need; add as many as you like, the fan re-spaces itself.

     Every asset is optional. A missing portrait draws a hand-lettered card,
     a missing clip shows a "the clip didn't load" note with a retry button.
     ═══════════════════════════════════════════════════════════════════════ */
  crew: [
    {
      slug: "crew-01",
      name: "Anika Tahsin Rahman",  
      since: "2025",                                   // ⚠ TODO
      role: "Professional Third-Wheeler to her own healing journey",
      portrait: "assets/crew/crew-01.jpg",
      photo:    "assets/crew/crew-01-photo.jpg",
      video:    "assets/crew/crew-01-clip.mp4",
      poster:   "assets/crew/crew-01-poster.jpg"
    },
    {
      slug: "crew-02",
      name: "Khadiza Sultana",                                     // ⚠ TODO
      role: "Chief Morale Officer",
      portrait: "assets/crew/crew-02.jpg",
      photo:    "assets/crew/crew-02-photo.jpg",
      video:    "assets/crew/crew-02-clip.mp4",
      poster:   "assets/crew/crew-02-poster.jpg"
    },
    {
      slug: "crew-03",
      name: "Samin Yasar",                                     // ⚠ TODO
      role: "Whinny Boy",
      since: "2024",
      portrait: "assets/crew/crew-03.jpg",
      photo:    "assets/crew/crew-03-photo.jpg",
      video:    "assets/crew/crew-03-clip.mp4",
      poster:   "assets/crew/crew-03-poster.jpg"
    },
    {
      slug: "crew-04",
      name: "Saraf Wamia",                                     // ⚠ TODO
      role: "Soulmate",
      since: "2019",
      portrait: "assets/crew/crew-04.jpg",
      photo:    "assets/crew/crew-04-photo.jpg",
      video:    "assets/crew/crew-04-clip.mp4",
      poster:   "assets/crew/crew-04-poster.jpg"
    }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     SCRIBBLES — drawings, pinned like polaroids. Lightbox on click.
       { src, alt, caption }
     ═══════════════════════════════════════════════════════════════════════ */
  scribbles: [
    { src: "assets/scribbles/scribble-01.jpg", alt: "Ink doodle",       caption: "drawn instead of revising" },
    { src: "assets/scribbles/scribble-02.jpg", alt: "Character sketch", caption: "he knows what he did" },
    { src: "assets/scribbles/scribble-03.jpg", alt: "Margin drawing",   caption: "margins of a probability sheet" },
    { src: "assets/scribbles/scribble-04.jpg", alt: "Sketchbook page",  caption: "3am, no notes" },
    { src: "assets/scribbles/scribble-05.jpg", alt: "Pen sketch",       caption: "attempted realism" },
    { src: "assets/scribbles/scribble-06.jpg", alt: "Colour study",     caption: "colour theory: unlearned" }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     ACHIEVEMENTS — trophy shelf. tier: "gold" | "silver" | "bronze" | "ink"
     Leave year as "" and it simply doesn't render.
     ═══════════════════════════════════════════════════════════════════════ */
  achievements: [
    { title: "Top 100",   org: "Solvio AI Hackathon",               year: "2025", tier: "ink"    },
    { title: "Champion",  org: "Regional National Biology Olympiad", year: "",    tier: "gold"   },  // ⚠ TODO year
    { title: "Champion",  org: "Inter Cantonment Math Olympiad",     year: "",    tier: "gold"   },  // ⚠ TODO year
    { title: "Runner-up", org: "Inter Cantonment Math Olympiad",     year: "",    tier: "silver" },  // ⚠ TODO year
    { title: "Top 10",    org: "National IQ Olympiad",               year: "",    tier: "bronze" },  // ⚠ TODO year
    { title: "Top 10",    org: "Regional Physics Olympiad",          year: "",    tier: "bronze" }   // ⚠ TODO year
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     SKILLS — grouped. Add a string, that's the whole operation.
     ═══════════════════════════════════════════════════════════════════════ */
  skills: [
    { group: "Languages",        items: ["Java", "C", "C++", "Python", "SQL"] },
    { group: "Databases",        items: ["PostgreSQL", "OracleSQL"] },
    { group: "Web",              items: ["HTML/CSS"] },
    { group: "Robotics & games", items: ["ROS", "Raylib"] },
    { group: "Hardware & CAD",   items: ["Proteus", "AutoCAD"] },
    { group: "Tools",            items: ["Git"] }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     EDUCATION — newest first.
     ═══════════════════════════════════════════════════════════════════════ */
  education: [
    {
      school:     "Islamic University of Technology",
      credential: "BSc, Software Engineering",
      when:       "Expected 2028",
      detail:     "Dhaka, Bangladesh."
    },
    {
      school:     "Cantonment English School & College",
      credential: "HSC · GPA 5.00",
      when:       "2023",
      detail:     "SSC 2021, GPA 5.00."
    }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     BEYOND CODE — sticky notes. Colour and tilt are assigned automatically.
     ═══════════════════════════════════════════════════════════════════════ */
  beyond: [
    { title: "Competitive programming", note: "Codeforces, CSES, USACO. Currently losing to a graph problem." },
    { title: "Machine learning",        note: "Mostly low-resource NLP, mostly Bangla, mostly evaluation." },
    { title: "Robotics",                note: "Rover autonomy with Team Altair." },
    { title: "Research",                note: "Looking for a group. Anything with a hard evaluation problem." },
    { title: "IUT Computer Society",    note: "Member, and event anchor — I hold the mic." },
    { title: "CodeRush Hackathon",      note: "Volunteer." },
    { title: "CTF",                     note: "Participant. Occasionally I even solve one." },
    { title: "Girl Guide",              note: "Years of it." }
  ],

  /* ══════════════════════════════════════════════════════════════════════════
     THE SCROLL PAYOFF — the creature at the very bottom. Click it and it says
     the next line. Add as many as you like; it wraps around.
     ═══════════════════════════════════════════════════════════════════════ */
  payoff: [
    "oh. you actually made it all the way down.",
    "most people stop at the projects, you know.",
    "there's nothing else here. this is it. this is the whole site.",
    "…unless you keep clicking.",
    "fine. the rover once drove into a wall at full speed. twice.",
    "the hallucination model scored 0.60 for a week because of one normalisation bug.",
    "I redrew this little guy four times.",
    "okay now that's genuinely everything. go email me."
  ]
};

window.SITE = SITE;

/* ============================================================================
   ADDING A WHOLE NEW SECTION (Research, Writing, Talks…)

   1. Add a heading:   SITE.sections.writing = { title: "Writing", note: "…" }
   2. Add the data:    SITE.writing = [ { … } ]
   3. index.html:      copy any <section>, change id="writing" and the
                       mount id to "writingMount", add a nav link
   4. js/render.js:    copy one render function, point it at SITE.writing

   Paper texture, tilt, torn edges and the nav highlight pick it up on their own.
   ============================================================================ */
