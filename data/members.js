/* ---------------------------------------------------------------------------
   MEMBER DIRECTORY DATA

   Organizers live in here too — they're members with `organizer: true`, which
   just puts a small "Organizer" badge under their initials and floats them to
   the top of the list.

   Each entry looks like this:

   {
     name:      "Full Name",
     program:   "PhD Student, Sociology",   // programme, department, or lab
     blurb:     "One or two lines on what they work on.",   // 250 chars max
     methods:   ["Network analysis"],        // up to 3, from METHOD_OPTIONS
     link:      "https://...",               // optional: profile or site
     photo:     "",                          // optional: "" gives initials
     organizer: true                         // optional, omit for members
   }

   Only `name` is required. Everything else degrades quietly — no blurb means
   no sentence, no methods means no pills, no photo means a pastel circle with
   the person's initials.
--------------------------------------------------------------------------- */

/* The method checkboxes on the registration form, in the form's own order.
   KEEP THESE TWO IN STEP: filter chips render in this order, and a label that
   doesn't match exactly becomes a separate chip. Anything someone typed into
   the form's "Other" box still works — it just lists after these,
   alphabetically. */
const METHOD_OPTIONS = [
  "Text as data/NLP",
  "Images, audio & video as data",
  "Network analysis",
  "Machine learning & prediction",
  "Causal inference (quasi-experimental)",
  "Experiments (field, lab, survey)",
  "Simulation & agent-based modeling",
  "Bayesian & statistical modeling",
  "Geospatial analysis",
  "Data collection (scraping, APIs, pipelines)",
  "LLMs in research (annotation, synthetic data, agents)"
];

const MEMBERS = [
  {
    name: "Daniel Verdi",
    program: "PhD Student, Education Data Science",
    blurb:
      "Science communication, social computing, and AI ethics. Studying how scientific and " +
      "technological knowledge gets communicated and governed. Particularly interested in " +
      "digital environments like AI and social media.",
    methods: [
      "Text as data/NLP",
      "Network analysis",
      "LLMs in research (annotation, synthetic data, agents)"
    ],
    link: "https://daniel-verdi.github.io/",
    photo: "img/people/daniel-verdi.jpg",
    organizer: true
  },
  // TODO: Ruishi's blurb and methods — this card stays sparse until they're in.
  {
    name: "Ruishi Chen",
    program: "PhD Student, Education Data Science",
    blurb: "",
    methods: [],
    link: "",
    photo: "",
    organizer: true
  }

  // ---------------------------------------------------------------------
  // Members go here. Example of the exact shape (commented entries never
  // appear on the site):
  //
  // {
  //   name: "Jane Doe",
  //   program: "PhD Student, Management Science & Engineering",
  //   blurb: "Modelling how misinformation spreads through campus networks.",
  //   methods: ["Network analysis", "Simulation & agent-based modeling"],
  //   link: "",
  //   photo: ""
  // },
  // ---------------------------------------------------------------------
];
