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
     host:    "",                   // optional: rotating departmental host
     location:"",                   // optional
     status:  "upcoming",           // "upcoming" or "past"  <-- flip after it happens
     materials: []                  // optional, only shown for past events:
                                    //   [{ label: "Slides", url: "https://..." }]
   }

   AFTER AN EVENT: change status to "past" and add any materials. It moves
   itself from the schedule to the archive automatically.
--------------------------------------------------------------------------- */

const EVENTS = [
  {
    quarter: "Autumn 2026",
    week: "Week 2",
    date: "TBD",
    title: "Kickoff + “Meet a Collaborator”",
    blurb:
      "The launch of (CSS)². An introduction to the community, followed by a structured session for meeting people working on related things in other departments. Food provided.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Autumn 2026",
    week: "Week 4",
    date: "TBD",
    title: "AI Panel with Stanford Faculty",
    blurb:
      "A panel of Stanford faculty on what AI is actually changing in social science research — and what it isn't.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Autumn 2026",
    week: "Week 7",
    date: "TBD",
    title: "Research Pathways Panel",
    blurb:
      "Senior interdisciplinary CSS researchers on how they built research programs and careers that span technical and theoretical fields, and what they would do differently.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },

  {
    quarter: "Winter 2027",
    week: "Week 1",
    date: "TBD",
    title: "External Speaker: Industry & Applied Research",
    blurb:
      "An invited speaker from industry or an applied research lab on computational social science outside the university.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Winter 2027",
    week: "Week 4",
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
    title: "IC2S2 Abstract Feedback Workshop",
    blurb:
      "Bring a draft abstract for the International Conference on Computational Social Science and get structured feedback from readers inside and outside your discipline before you submit.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },

  {
    quarter: "Spring 2027",
    week: "Week 1",
    date: "TBD",
    title: "Methods Exchange Workshop",
    blurb:
      "Short, practical sessions in which members teach the methods they use day to day — enough to know whether a method belongs in your own work, and who to ask when it does.",
    host: "",
    location: "",
    status: "upcoming",
    materials: []
  },
  {
    quarter: "Spring 2027",
    week: "Week 4",
    date: "TBD",
    title: "Community Social",
    blurb:
      "An ice cream social and informal networking. No agenda, no slides.",
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
