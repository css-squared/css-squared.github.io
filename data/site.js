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

/* Organizers, shown on the home page.

   `photo` is optional: drop a square image into img/people/ and point at it,
   e.g. photo: "img/people/daniel.jpg". Leave it as "" and you get a pastel
   circle with your initials instead, which is what members get. Crop square
   before committing — it's displayed as a circle, and a 200x200 file is
   plenty. */
const ORGANIZERS = [
  {
    name: "Daniel Verdi",
    role: "PhD Student",
    unit: "Education Data Science",
    link: "",
    photo: ""
  },
  {
    name: "Ruishi Chen",
    role: "PhD Student",
    unit: "Education Data Science",
    link: "",
    photo: ""
  }
];
