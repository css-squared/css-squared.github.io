/* ---------------------------------------------------------------------------
   EVENTS DATA — edit this file to update the schedule. No HTML required.

   Each event looks like this:

   {
     quarter: "Autumn 2026",        // grouping header on the schedule
     week:    "Week 2",             // short label shown next to the date
     date:    "TBD",                // free text, shown exactly as written
                                    //   e.g. "Thu Oct 8 · 4:00–5:30pm"
     title:   "Event title",
     blurb:   "One or two sentences describing the event.",
     speakers: [],                  // optional: [{ name: "Ada", url: "https://..." }]
                                    //   url is optional; names show as links
     speakersLabel: "Speakers",     // optional: e.g. "Panelists"
     host:    "",                   // optional: rotating departmental host
     location:"",                   // optional
     status:  "upcoming",           // "upcoming" or "past"  <-- flip after it happens
     materials: []                  // optional, only shown for past events:
                                    //   [{ label: "Slides", url: "https://..." }]
   }

   AFTER AN EVENT: change status to "past" and add any materials. It moves
   itself from the schedule to the archive automatically, and picks up a green
   "Held" tick under its week badge.
--------------------------------------------------------------------------- */

const EVENTS = [
  {
    quarter: "Autumn 2026",
    week: "Week 2",
    date: "October 1st, 2026",
    title: "Kickoff",
    blurb:
      "The launch of (CSS)². An informal gathering for us to get to know each other. Food provided.",
    host: "",
    location: "",
    status: "past",
    materials: []
  },
  {
    quarter: "Autumn 2026",
    week: "Week 5",
    date: "October 26th, 2026",
    title: "Career Pathways Panel",
    blurb:
      "Interdisciplinary CSS researchers on how they built careers that span technical and social science fields, and what they would do differently.",
    speakersLabel: "Panelists",
    speakers: [
      { name: "Kath Landgren", url: "https://kathlandgren.com" },
      { name: "Jacy Reese Anthis", url: "https://jacyanthis.com" },
      { name: "Portia Wang", url: "https://pwang1230.github.io" }
    ],
    host: "",
    location: "",
    status: "past",
    materials: []
  },

  {
    quarter: "Winter 2027",
    week: "Week 3",
    date: "TBD",
    title: "“What Everyone in CSS Should Know”",
    blurb:
      "A working session on the core concepts that cross every CSS subfield. We build the shared glossary together and collect “Secret Syllabus” reflections — the foundational papers and books people assume everyone has read.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Winter 2027",
    week: "Week 7",
    date: "TBD",
    title: "Methods Exchange & IC2S2 Abstract Workshop",
    blurb:
      "Two halves in one session: short, practical demos in which members teach the methods they use day to day, then structured feedback on draft abstracts for the International Conference on Computational Social Science before you submit.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },

  {
    quarter: "Spring 2027",
    week: "Week 2",
    date: "TBD",
    title: "Ice Cream Community Social",
    blurb:
      "Ice cream and informal networking. No agenda, no slides.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Spring 2027",
    week: "Week 7",
    date: "TBD",
    title: "End-of-Year CSS Showcase",
    blurb:
      "A symposium of lightning talks from across the schools, showing what the community worked on this year, followed by a closing celebration.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  }
];
