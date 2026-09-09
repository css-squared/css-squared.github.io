# (CSS)² website

Static site for **(CSS)² — Computational Social Science Community Space at Stanford**.
Plain HTML and CSS with no build step, no framework, and no dependencies. Open
`index.html` in a browser and it works.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | What (CSS)² is, the five kinds of gathering, organizers, join |
| `events.html` | Upcoming schedule, past sessions with slides/notes |
| `resources.html` | Shared glossary, CSS Canon, related Stanford programs |
| `directory.html` | Searchable member directory, filterable by school / method / data |

## Editing content

**You should never need to edit an `.html` file to change content.** Everything
comes from the four files in `data/`:

| File | Holds |
| --- | --- |
| `data/site.js` | Registration form link, Slack invite link, contact email, organizers |
| `data/events.js` | Every event, past and upcoming |
| `data/members.js` | The approved member directory |
| `data/resources.js` | Glossary terms, CSS Canon entries, related programs |

Each file starts with a comment block showing the exact shape of an entry. Copy
an existing block, change the values, save, publish.

### Common edits

**Confirm an event's date, room, or host** — open `data/events.js`, replace
`date: "TBD"` with anything you like (it's shown exactly as written, e.g.
`"Thu Oct 8 · 4:00–5:30pm"`), and fill in `location` and `host`.

**Move an event to the archive** — change its `status` from `"upcoming"` to
`"past"` and add materials:

```js
status: "past",
materials: [
  { label: "Slides", url: "https://..." },
  { label: "Reading list", url: "https://..." }
]
```

It disappears from the schedule and appears in the archive automatically. Don't
delete past events — the archive is the evidence the community is sustained.

**Add the Slack link** — set `slackUrl` in `data/site.js`. Until it has a value,
every "Join the Slack" button hides itself, so there are no dead links on the
site while you're waiting for the workspace. Same for `contactEmail`: set it and
a contact line appears in the footer, leave it blank and nothing shows.

**Add an organizer** — copy a block into `ORGANIZERS` in `data/site.js`. They
appear in the Organizers drawer on the home page.

## Adding members

The Google Form is restricted to Stanford accounts, so affiliation is checked
at the door rather than by you. Nothing is auto-synced yet — for now, copy each
response into `MEMBERS` in `data/members.js`:

```js
{
  name: "Jane Doe",
  role: "PhD Student",
  unit: "Management Science & Engineering",
  school: "Engineering",
  blurb: "Modelling how misinformation spreads through campus networks.",
  methods: ["Network analysis", "Simulation & agent-based modeling"],
  seeking: true,
  link: "",
  photo: ""
},
```

Only `name` is required; everything else degrades quietly.

Two things that matter:

- **`school` must exactly match a value in the `SCHOOLS` list** at the top of
  the file. A near-miss like `"Humanities & Sciences"` fails silently — the
  person still appears, but the school chip never finds them.
- **`methods` should come from `METHOD_OPTIONS`**, also at the top of that
  file. That list is the same one the form offers as checkboxes; keep the two in
  step. Filter chips appear in `METHOD_OPTIONS` order, and anything typed into
  the form's "Other" box still works — it's just listed after them.

### Photos

Optional, and only worth it for the organizers on the home page. Crop square,
save around 200x200, drop it in `img/people/`, and point at it:

```js
photo: "img/people/daniel.jpg"
```

Leave `photo` empty and you get a pastel circle with the person's initials,
which is what members get by default. Both render at exactly the same size, so
a card with a face and a card without sit level. Anything that isn't a real
image path is ignored rather than rendered.

## Publishing

The site is hosted on GitHub Pages from the `main` branch, root folder. It is
plain static files with no build step, so there is nothing to compile and no
deploy pipeline to babysit.

**To publish a change:** edit the data file, then

```
git add -A
git commit -m "Update schedule"
git push
```

Pages redeploys on its own, usually within a minute. Hard-refresh
(Ctrl+Shift+R) if you don't see it immediately — browsers cache the data files.

**First-time setup**, for reference:

1. Create an empty repo named `css-squared` on github.com (no README, no
   `.gitignore` — this repo already has both).
2. `git remote add origin https://github.com/<user>/css-squared.git`
3. `git push -u origin main`
4. Repo **Settings → Pages → Source: Deploy from a branch**, branch `main`,
   folder `/ (root)`.

Notes:

- Every asset path in the HTML is relative (`css/site.css`, not
  `/css/site.css`), which is what lets the site work from the
  `/css-squared/` subpath Pages serves it from. If you ever add a link with a
  leading slash, the stylesheet will break in production while still looking
  fine locally.
- `.nojekyll` tells Pages to serve the files as-is instead of running them
  through Jekyll. Leave it there.
- If you later want a `stanford.edu` address, request a subdomain from
  Stanford IT and point it at Pages with a `CNAME` file.

## Design notes

**Warm, soft, modern.** Read this before restyling anything, so edits stay
coherent.

- **Cardinal anchors; four pastel highlighters carry everything else** —
  butter, mint, blush, sky. They fill the bento tiles, the member tags, the
  quarter labels, and the marker swipes behind key phrases in headings
  (`.hl`, `.hl--mint`, `.hl--blush`, `.hl--sky`). Nothing on the site is grey.
- **The marker swipe is a background gradient**, so it survives line wrapping.
  If you change the heading size, check that the band still covers the word
  rather than sitting under it.
- **Corners are generous** — 20–32px on surfaces, fully round on anything
  clickable. **Shadows are soft and warm-tinted**, never grey and never a hard
  offset.
- **The bento is deliberately not a uniform grid.** Six columns; the tiles are
  two wide (span 3) and three small (span 2). If you add a tile, keep each row
  adding to 6 or you'll get a ragged gap.
- **People are pastel initial circles**, tinted by position so a member's
  colour doesn't change when the list is filtered. No placeholder avatars, and
  no photo uploads to chase.
- **The hero sticker cluster** is what people actually turn up holding — it's
  the "I have data / I have methods" idea from the kickoff name tags, and it
  straightens out when you hover the group.
- **The logo** is two staggered rounded squares — the two halves of the field,
  overlapping in a shared space, and literally "squared". It appears in three
  places that must stay in step: the nav (`.brand__mark`), the home-page
  masthead (`.lockup__mark`), and `img/favicon.svg`. The front square carries a
  ring in the page colour so the two read as separate stickers; if you change
  the page background, change that stroke too. The wordmark beside it is plain
  type — `CSS<sup>2</sup>` with the superscript in cardinal.
- Everything lifts a couple of pixels on hover. All motion is disabled under
  `prefers-reduced-motion`.
- Type: **Bricolage Grotesque** for headings (it has personality without being
  cute-for-its-own-sake), **Plus Jakarta Sans** for reading. Both from Google
  Fonts with system fallbacks, so the site still reads offline.

## Other notes

- All content from the data files is HTML-escaped before rendering, so a stray
  `<` or `&` in a member's name or a paper's title can't break the page. Links
  from the data files are checked too: anything that isn't `http`, `https`,
  `mailto`, or a relative path is dropped rather than rendered.
- `.claude/launch.json` is only there so a local preview server can be started
  during development. Deleting it changes nothing about the site.
