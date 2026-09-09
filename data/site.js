/* ---------------------------------------------------------------------------
   SITE-WIDE SETTINGS — the links in the header, footer, and every "join"
   button, plus the organizer list. Change them here once, they change
   everywhere.
--------------------------------------------------------------------------- */

const SITE = {
  // The registration form: join path + directory signup in one.
  formUrl: "https://forms.gle/x6PrX5MpyZVTisvT6",

  // Slack invite link. Leave "" until you have one — the Slack buttons
  // hide themselves automatically while it's empty.
  slackUrl: "",

  // Contact address shown in the footer. Leave "" to hide it.
  contactEmail: ""
};

/* Organizers, shown at the bottom of the events page.
   { name, role, unit, link }  — link is optional. */
const ORGANIZERS = [
  {
    name: "Daniel Verdi",
    role: "PhD Student",
    unit: "Education Data Science",
    link: ""
  },
  {
    name: "Ruishi Chen",
    role: "PhD Student",
    unit: "Education Data Science",
    link: ""
  }
];
