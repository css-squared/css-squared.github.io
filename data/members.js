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
  {
    name: "Ruishi Chen",
    program: "PhD Student, Education Data Science",
    blurb:
      "Ruishi's research examines how evaluative processes shape knowledge diffusion and how " +
      "emerging technologies transform these processes. In particular, she studies how " +
      "institutions assess ideas and innovations using computational methods.",
    methods: [
      "Text as data/NLP",
      "Network analysis",
      "Simulation & agent-based modeling"
    ],
    link: "https://ruishi-chen.github.io/",
    photo: "img/people/ruishi-chen.jpg",
    organizer: true
  },

  {
    name: "Muhua Huang",
    program: "PhD Student, Organizational Behavior",
    blurb: "",
    methods: [
      "Text as data/NLP",
      "Images, audio & video as data",
      "LLMs in research (annotation, synthetic data, agents)"
    ],
    link: "https://www.linkedin.com/in/muhua-huang-0311a2177",
    photo: "img/people/muhua-huang.jpg",
    organizer: true
  },
  {
    name: "Yuka Machino",
    program: "PhD Student, Computer Science",
    blurb:
      "I am advised by Prof. Robert Hawkins, and Prof. Douglas Guilbeault. I combine " +
      "behavioral experiments with computational models to understand how social norms and " +
      "common ground help individuals in a community coordinate and communicate.",
    methods: [
      "Text as data/NLP",
      "Experiments (field, lab, survey)",
      "Simulation & agent-based modeling"
    ],
    link: "https://yukam997.github.io/",
    photo: "",
    organizer: true
  },
  {
    name: "Marie Wako",
    program: "JSD Candidate",
    blurb:
      "Marie Wako is a JSD candidate at Stanford Law School. She combines empirical legal " +
      "studies and computational text analysis to examine how race and gender shape legal " +
      "institutions and everyday legal processes in the US and Japan.",
    methods: [
      "Text as data/NLP",
      "Causal inference (quasi-experimental)",
      "LLMs in research (annotation, synthetic data, agents)"
    ],
    link: "",
    photo: "img/people/marie-wako.jpg"
  },
  {
    name: "Kath Landgren",
    program: "Postdoc, Environmental Social Sciences",
    blurb:
      "Ekaterina (Kath) Landgren is a Dean’s Postdoctoral Fellow at the Stanford Doerr " +
      "School of Sustainability. She holds a PhD in Applied Mathematics. She uses mathematical " +
      "modeling and data science to study how people think about climate change.",
    methods: [
      "Text as data/NLP",
      "Experiments (field, lab, survey)",
      "Simulation & agent-based modeling"
    ],
    // The form answer was "kathlandgren.com" with no scheme, which the link
    // check rejects. Added https:// so the name is clickable.
    link: "https://kathlandgren.com",
    photo: "img/people/kath-landgren.jpg"
  },
  {
    name: "Ke ‘Kay’ Fang",
    program: "PhD Student, Psychology (Cognitive Science)",
    blurb:
      "I am a PhD student in Psychology (Cognitive Science). My research focuses on " +
      "computational approaches to understanding how distributed individual minds give rise " +
      "to emergent collective phenomena, including cooperation, norms, and polarization.",
    methods: [
      "Experiments (field, lab, survey)",
      "Simulation & agent-based modeling",
      "Bayesian & statistical modeling"
    ],
    link: "https://kefangpsych.github.io/intro.html",
    photo: "img/people/ke-fang.jpg"
  },
  {
    name: "Kelly Liu",
    program: "PhD Student, Sociology",
    blurb: "",
    methods: [
      "Text as data/NLP",
      "Network analysis",
      "Simulation & agent-based modeling"
    ],
    link: "",
    photo: "img/people/kelly-liu.jpg"
  },
  {
    name: "Tara Srirangarajan",
    program: "Postdoc, Stanford Graduate School of Business",
    blurb:
      "I am a Postdoctoral Scholar at the Stanford Graduate School of Business. My research " +
      "examines how affective processes shape human behavior across levels of analysis.",
    methods: [
      "Text as data/NLP",
      "Images, audio & video as data",
      "Experiments (field, lab, survey)"
    ],
    link: "",
    photo: "img/people/tara-srirangarajan.jpg"
  },
  {
    name: "Lorena Martin Rodriguez",
    program: "PhD Student, Linguistics",
    blurb:
      "I use NLP approaches to multilingual multimodal data to answer questions to social " +
      "problems.",
    methods: [
      "Text as data/NLP",
      "Geospatial analysis",
      "LLMs in research (annotation, synthetic data, agents)"
    ],
    link: "https://www.linkedin.com/in/lorenamartinr",
    photo: "img/people/lorena-martin-rodriguez.jpg"
  },
  {
    name: "Joice Chen",
    program: "PhD Student, Organizational Behavior",
    blurb:
      "Joice is broadly interested in studying dynamics within social and cultural systems, " +
      "such as changes in cultural variation, cultural transmission in networks, and how " +
      "innovations emerge.",
    methods: [
      "Network analysis",
      "Simulation & agent-based modeling"
    ],
    link: "",
    photo: ""
  },
  {
    name: "Kerstin Forster",
    program: "Visiting PhD Student, Machine Learning for Sustainability",
    blurb:
      "Kerstin is a PhD student at LMU Munich and Visiting Researcher at Stanford. She applies " +
      "machine learning to sustainability and global development, focusing on ESG reporting, " +
      "development finance, SDG forecasting, and climate communication.",
    methods: [
      "Text as data/NLP",
      "Machine learning & prediction",
      "LLMs in research (annotation, synthetic data, agents)"
    ],
    link: "https://www.linkedin.com/in/kerstinforster/",
    photo: "img/people/kerstin-forster.jpg"
  },
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
