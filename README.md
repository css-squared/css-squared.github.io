# CSS² website

Static site for **CSS² — Computational Social Science Community Space at Stanford**.
Plain HTML and CSS with no build step, no framework, and no dependencies. Open
`index.html` in a browser and it works.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | What CSS² is, the five kinds of gathering, organizers, join |
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

## Member approval workflow

The registration form is public, so **nothing reaches the directory without you
approving it.** There is no automatic sync — that's deliberate.

1. A response lands in the form's Google Sheet.
2. Check Stanford affiliation. Two things make this much easier:
   - In Google Forms, turn on **Settings → Responses → Restrict to users in
     Stanford University** and **Collect email addresses**. That blocks
     non-Stanford accounts at the door rather than at your desk.
   - Add an `Approved` column to the sheet and mark rows `yes` as you clear them,
     so you always know where you stopped.
3. For each approved person who opted into the directory, copy a block into
   `MEMBERS` in `data/members.js`:

```js
{
  name: "Jane Doe",
  role: "PhD Student",
  unit: "Management Science & Engineering",
  school: "Engineering",
  methods: ["Network analysis", "Agent-based modeling"],
  data: ["Organizational records"],
  seeking: true,
  link: ""
},
```

4. Save and publish.

Two rules that keep the directory useful:

- **Reuse tags.** `"NLP"` and `"Natural language processing"` become two separate
  filter chips that each match half the people. Pick one spelling and stick to it.
- **`school`** must be one of the values in the `SCHOOLS` list at the top of
  `data/members.js`, or the school filter won't pick it up.

Batching this once a week is fine, and cheaper than any automation would be at
this scale.

## Publishing

The site is static files, so almost anything will host it. Simplest path:

1. Create a GitHub repository and put these files in it.
2. Repository **Settings → Pages → Source: deploy from branch**, branch `main`,
   folder `/ (root)`.
3. It goes live at `https://<user-or-org>.github.io/<repo>/` in a minute or two.

To publish an edit afterwards: change the data file, commit, push. Pages
redeploys on its own.

If you later want a `stanford.edu` address, request a subdomain (something with a
word in it — `cssquared.stanford.edu` reads better than anything with a bare 2)
and point it at Pages with a `CNAME` file.

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
