/* ---------------------------------------------------------------------------
   MEMBER DIRECTORY DATA

   Each member looks like this:

   {
     name:    "Full Name",
     role:    "PhD Student",              // PhD / Masters Student, Postdoc, Faculty, Staff
     unit:    "Sociology",                // department, lab, or program
     school:  "H&S",                      // must match a value in SCHOOLS below
     blurb:   "One sentence on what they're working on.",
     methods: ["Causal inference"],        // what they can help others with
     seeking: true,                        // true = looking for collaborators
     link:    "https://...",               // optional: profile or personal site
     photo:   ""                           // optional: leave empty for initials
   }

   Only `name` is required. Everything else degrades quietly — no blurb means
   no sentence, no methods means no pills, no photo means a pastel circle with
   the person's initials.
--------------------------------------------------------------------------- */

/* School filter. Order here is the order the chips appear in. */
const SCHOOLS = [
  "H&S",
  "Engineering",
  "GSE",
  "GSB",
  "Medicine",
  "Law",
  "Sustainability",
  "Other"
];

/* The canonical method list — KEEP THIS IN STEP WITH THE FORM'S CHECKBOXES.
   Filter chips appear in this order, so the directory looks the same from one
   week to the next. Anything a member typed into the form's "Other" box still
   works: it just gets listed after these, alphabetically. */
const METHOD_OPTIONS = [
  "Text as data / NLP",
  "LLMs in research",
  "Network analysis",
  "Machine learning & prediction",
  "Causal inference",
  "Experiments",
  "Simulation & agent-based modeling",
  "Bayesian & statistical modeling",
  "Measurement & survey design",
  "Geospatial analysis",
  "Images, audio & video as data",
  "Data collection (scraping, APIs)"
];

const MEMBERS = [
  // ---------------------------------------------------------------------
  // Members go here. Example of the exact shape (commented entries never
  // appear on the site):
  //
  // {
  //   name: "Jane Doe",
  //   role: "PhD Student",
  //   unit: "Management Science & Engineering",
  //   school: "Engineering",
  //   blurb: "Modelling how misinformation spreads through campus networks.",
  //   methods: ["Network analysis", "Simulation & agent-based modeling"],
  //   seeking: true,
  //   link: "",
  //   photo: ""
  // },
  // ---------------------------------------------------------------------
];
