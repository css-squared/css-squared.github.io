/* ---------------------------------------------------------------------------
   RESOURCES DATA — glossary, CSS Canon, and community anchors.

   These fill up over the year. The Winter "What Everyone in CSS Should Know"
   workshop is where most of the first batch comes from.
--------------------------------------------------------------------------- */

/* Shared glossary.
   { term: "...", short: "one-line definition", fields: ["Sociology", "CS"] }
   `fields` is optional — use it when a term means different things in
   different disciplines, which is exactly the translation problem we're
   trying to fix. */
const GLOSSARY = [
  // { term: "Fixed effects", short: "…", fields: ["Economics"] },
];

/* The CSS Canon — influential papers and books.
   { title, authors, year, note, url }   url and note are optional. */
const CANON = [
  // {
  //   title: "…",
  //   authors: "…",
  //   year: 2009,
  //   note: "Why this one matters, in one sentence.",
  //   url: ""
  // },
];

/* Existing programmatic anchors at Stanford. Leave url as "" if you don't
   have the link yet — it will render as plain text instead of a dead link. */
const ANCHORS = [
  {
    name: "Education Data Science",
    unit: "Graduate School of Education",
    url: ""
  },
  {
    name: "Computational Social Science specialization",
    unit: "Management Science & Engineering",
    url: ""
  },
  {
    name: "Computational Sociology Workshop",
    unit: "Department of Sociology",
    url: ""
  }
];
