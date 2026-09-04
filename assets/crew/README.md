# assets/crew — the trading cards

Filenames come from each person's `slug` in `data.js`. Every file is optional:
a missing portrait draws a hand-lettered card, and a missing clip shows the
"the clip didn't load" note with a retry button and a direct file link.

For each crew member with slug `crew-01`:

| File | Purpose | Notes |
|------|---------|-------|
| `crew-01.jpg` | Card front portrait | Square, 600×600. A photo works; a drawn portrait works better. |
| `crew-01-photo.jpg` | Card back, if there's no clip | Only used when `video` is absent |
| `crew-01-clip.mp4` | The clip on the back | Portrait orientation, a few seconds, **under 20MB** |
| `crew-01-poster.jpg` | Frame shown before the clip loads | This is what people see first — pick a good frame |

Currently expected: `crew-01`, `crew-02`, `crew-03`, `crew-04`.

## Before you publish

**Ask each person first.** Their face, their voice and an invented job title
are going on a public page under your name. Getting a yes takes one message
and saves an awkward one later.

## Encoding

```
# shrink an oversized clip
ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=-2:720 crew-01-clip.mp4

# grab a poster frame at 2 seconds
ffmpeg -i crew-01-clip.mp4 -ss 2 -vframes 1 -q:v 3 crew-01-poster.jpg
```

Clips are muted by default and only start when a card is flipped — the unmute
button on the frame is the only way sound ever plays. Nothing downloads until
the deck is near the viewport.

Git keeps every version of a binary forever. If you swap clips often, use Git
LFS rather than committing a dozen revisions of the same MP4.
