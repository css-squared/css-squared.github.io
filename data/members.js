/* ---------------------------------------------------------------------------
   MEMBER DIRECTORY DATA

   Each member looks like this:

   {
     name:    "Full Name",
     program: "PhD Student, Sociology",    // programme, department, or lab
     blurb:   "One or two lines on what they work on.",   // 300 chars max
     methods: ["Network analysis"],         // up to 3, from METHOD_OPTIONS
     link:    "https://...",                // optional: profile or personal site
     photo:   ""                            // optional: leave empty for initials
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
