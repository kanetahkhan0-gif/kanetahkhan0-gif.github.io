# assets/work — project covers

**All optional, and currently unused.** Every tile on The Wall draws an
illustration from `js/doodles.js` instead — a robot for the hallucination work,
a six-wheeled rover for Musafir, a cat for Melo, and so on. The Wall is
finished as it stands.

If you later make a screenshot or photo worth showing, add a `cover` key to
that project in `data.js` pointing at the file, and it wins over the drawing.
If a cover is ever missing or fails to load, the tile falls back to the drawing
rather than breaking.

Filenames below match each project's `slug`, which is the convention to follow.

| File | Project |
|------|---------|
| `hallucination.jpg` | Bengali LLM Hallucination Detection |
| `musafir.jpg` | Musafir — Team Altair Rover |
| `careerpilot.jpg` | CareerPilot |
| `silent-hallway.jpg` | Silent Hallway Chase |
| `acadence.jpg` | Acadence |
| `cowork.jpg` | CoWork |
| `metra.jpg` | Metra |
| `unwind.jpg` | Unwind |
| `digital-clock.jpg` | Digital Clock System |
| `campushub.jpg` | CampusHub |
| `tunebottle.jpg` | TuneBottle |
| `melo.jpg` | Melo |

## The hover gallery

One tile cycles frames on hover, and auto-cycles on phones where hover doesn't
exist. It's CareerPilot, and it already works — its `gallery` key lists three
doodle names, so it cycles four drawings with no files at all.

Each `gallery` entry is either a **doodle name** or an **image path**: anything
containing a `/` or a `.` is treated as a file. So to use real screenshots,
replace the three strings with paths:

```js
gallery: ["assets/work/careerpilot-01.jpg", "assets/work/careerpilot-02.jpg"]
```

To move the gallery to a different project, move the `gallery` key in `data.js`.

## Sizing

Frames are 4:3 and about 400px wide on screen. Export at **1000×750**, JPG,
quality ~80. Anything larger is wasted bytes. Screenshots, terminal output and
Proteus schematics all work — they don't have to be pretty, they have to be
legible at thumbnail size.
