/* ===========================================================================
   (CSS)² site scripts.

   Everything is rendered from the files in /data. You should never need to
   edit this file to add an event, a member, an organizer, or a resource.
   =========================================================================== */

(function () {
  "use strict";

  /* --- helpers ---------------------------------------------------------- */

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function el(id) {
    return document.getElementById(id);
  }

  function isSafeUrl(url) {
    return typeof url === "string" && /^(https?:\/\/|mailto:|\/|\.)/i.test(url.trim());
  }

  function linked(text, url, cls) {
    var safe = esc(text);
    if (!isSafeUrl(url)) return safe;
    return (
      '<a ' +
      (cls ? 'class="' + cls + '" ' : "") +
      'href="' +
      esc(url) +
      '" target="_blank" rel="noopener">' +
      safe +
      "</a>"
    );
  }

  /* Method labels match the form exactly, which means some carry a long
     parenthetical ("LLMs in research (annotation, synthetic data, agents)").
     Pills and chips show the short form; the full label stays in the data, in
     the tooltip, and in search. */
  function shortLabel(text) {
    return String(text == null ? "" : text).replace(/\s*\([^)]*\)\s*$/, "");
  }

  /* Each method gets its own pastel, keyed to its position in METHOD_OPTIONS
     so a method is the same colour everywhere and from one visit to the next.
     Free-text "Other" answers fall back to a hash of the label. */
  function toneFor(method) {
    var canonical = typeof METHOD_OPTIONS !== "undefined" ? METHOD_OPTIONS : [];
    var i = canonical.indexOf(method);
    if (i === -1) {
      i = 0;
      for (var c = 0; c < method.length; c++) {
        i = (i * 31 + method.charCodeAt(c)) % 997;
      }
    }
    return "tone-" + (i % 6);
  }

  /* Photos may be an https URL or a path inside the repo (img/people/x.jpg),
     so this is deliberately looser than isSafeUrl but still refuses
     protocol-relative and javascript: values. */
  function isSafeImage(src) {
    if (typeof src !== "string" || !src.trim()) return false;
    var v = src.trim();
    var hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(v);
    if (v.indexOf("//") === 0 || (hasScheme && !/^https:\/\//i.test(v))) {
      return false;
    }
    return /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(v);
  }

  /* Up to two initials, for the pastel circle beside a person's name. */
  function initials(name) {
    var words = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(function (w) {
        return /[a-z0-9]/i.test(w);
      });
    if (!words.length) return "?";
    var first = words[0].replace(/[^a-z0-9]/gi, "").charAt(0) || "";
    var last =
      words.length > 1 ? words[words.length - 1].replace(/[^a-z0-9]/gi, "").charAt(0) || "" : "";
    return (first + last).toUpperCase() || "?";
  }

  /* One of four pastels, stable per person so it doesn't reshuffle. */
  function avatarTint(index) {
    return "avatar--" + (index % 4);
  }

  function personHtml(p, index, extraHtml) {
    var face = isSafeImage(p.photo)
      ? '<img class="avatar avatar--photo" src="' +
        esc(p.photo) +
        '" alt="" loading="lazy" width="46" height="46">'
      : '<span class="avatar ' +
        avatarTint(index) +
        '" aria-hidden="true">' +
        esc(initials(p.name)) +
        "</span>";

    var program = esc(p.program || "");

    var badge = p.organizer
      ? '<span class="person__badge">Organizer</span>'
      : "";

    return (
      '<article class="person">' +
      '<div class="person__head">' +
      '<div class="person__face">' +
      face +
      badge +
      "</div>" +
      '<div class="person__id">' +
      '<h3 class="person__name">' +
      linked(p.name, p.link) +
      "</h3>" +
      (program ? '<p class="person__role">' + program + "</p>" : "") +
      "</div>" +
      "</div>" +
      (p.blurb ? '<p class="person__blurb">' + esc(p.blurb) + "</p>" : "") +
      (extraHtml || "") +
      "</article>"
    );
  }

  /* --- site-wide links -------------------------------------------------- */

  function applySiteLinks() {
    var site = typeof SITE === "object" && SITE ? SITE : {};

    // The form and Slack live off-site, so they open in a new tab — nobody
    // should lose the page they were reading to go and register.
    function external(node, url) {
      if (!isSafeUrl(url)) {
        node.classList.add("hidden");
        return;
      }
      node.setAttribute("href", url);
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener");
    }

    document.querySelectorAll("[data-form-link]").forEach(function (node) {
      external(node, site.formUrl);
    });

    // Slack links hide themselves until a workspace invite exists.
    document.querySelectorAll("[data-slack-link]").forEach(function (node) {
      external(node, site.slackUrl);
    });

    document.querySelectorAll("[data-contact-email]").forEach(function (node) {
      if (site.contactEmail) {
        node.setAttribute("href", "mailto:" + site.contactEmail);
        node.textContent = site.contactEmail;
      } else {
        node.classList.add("hidden");
      }
    });
  }

  /* --- events ----------------------------------------------------------- */

  function eventHtml(event, isPast) {
    var meta = [];
    if (event.date) meta.push(esc(event.date));
    if (event.location) meta.push(esc(event.location));
    if (event.host) meta.push("Hosted by " + esc(event.host));

    var materials = "";
    if (isPast && Array.isArray(event.materials)) {
      var links = event.materials
        .filter(function (m) {
          return m && m.label && isSafeUrl(m.url);
        })
        .map(function (m) {
          return "<li>" + linked(m.label, m.url, "pill pill--link") + "</li>";
        })
        .join("");
      if (links) materials = '<ul class="pills">' + links + "</ul>";
    }

    return (
      '<article class="event' +
      (isPast ? " event--past" : "") +
      '">' +
      '<span class="event__week">' +
      esc(event.week || "") +
      "</span>" +
      "<div>" +
      '<h3 class="event__title">' +
      esc(event.title || "") +
      "</h3>" +
      '<p class="event__blurb">' +
      esc(event.blurb || "") +
      "</p>" +
      (meta.length ? '<p class="event__meta">' + meta.join(" · ") + "</p>" : "") +
      materials +
      "</div>" +
      "</article>"
    );
  }

  function renderEvents(container, status, emptyHtml) {
    if (!container) return;

    var all = typeof EVENTS !== "undefined" && Array.isArray(EVENTS) ? EVENTS : [];
    var list = all.filter(function (e) {
      return (e.status || "upcoming") === status;
    });

    if (!list.length) {
      container.innerHTML = emptyHtml || "";
      return;
    }

    // Group by quarter, keeping the order quarters first appear in the data
    // file. The archive reads most recent first.
    var order = [];
    var groups = {};
    list.forEach(function (e) {
      var key = e.quarter || "Upcoming";
      if (!groups[key]) {
        groups[key] = [];
        order.push(key);
      }
      groups[key].push(e);
    });
    if (status === "past") order.reverse();

    container.innerHTML = order
      .map(function (key) {
        return (
          '<section class="quarter">' +
          '<h3 class="quarter__name">' +
          esc(key) +
          "</h3>" +
          groups[key]
            .map(function (e) {
              return eventHtml(e, status === "past");
            })
            .join("") +
          "</section>"
        );
      })
      .join("");
  }

  /* --- member directory ------------------------------------------------- */

  function memberHtml(m) {
    var pills = (m.methods || [])
      .map(function (t) {
        return (
          '<li><span class="pill ' +
          toneFor(t) +
          '" title="' +
          esc(t) +
          '">' +
          esc(shortLabel(t)) +
          "</span></li>"
        );
      })
      .join("");

    return personHtml(m, m._i, pills ? '<ul class="pills">' + pills + "</ul>" : "");
  }

  function setupDirectory() {
    var results = el("member-results");
    if (!results) return;

    var members = typeof MEMBERS !== "undefined" && Array.isArray(MEMBERS) ? MEMBERS : [];
    var emptyState = el("directory-empty");
    var controls = el("directory-controls");
    var legend = el("directory-legend");
    var count = el("member-count");

    if (!members.length) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (controls) controls.classList.add("hidden");
      if (legend) legend.classList.add("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    // Organizers first, then everyone else in file order. Sorting here rather
    // than relying on the order of data/members.js means adding someone at the
    // top of that file can't accidentally bury the organizers.
    members = members.slice().sort(function (a, b) {
      return (a.organizer ? 0 : 1) - (b.organizer ? 0 : 1);
    });

    // Tint is assigned once, so a person's circle colour doesn't change
    // when the list is filtered.
    members.forEach(function (m, i) {
      m._i = i;
    });

    var state = { methods: [], query: "" };

    var canonical = typeof METHOD_OPTIONS !== "undefined" ? METHOD_OPTIONS : [];
    var used = {};
    members.forEach(function (m) {
      (m.methods || []).forEach(function (t) {
        used[t] = true;
      });
    });
    var methodsInUse = canonical
      .filter(function (t) {
        return used[t];
      })
      .concat(
        Object.keys(used)
          .filter(function (t) {
            return canonical.indexOf(t) === -1;
          })
          .sort(function (a, b) {
            return a.localeCompare(b);
          })
      );

    function chipRow(containerId, values, key) {
      var host = el(containerId);
      if (!host) return;
      if (!values.length) {
        var row = host.closest(".filters__row");
        if (row) row.classList.add("hidden");
        return;
      }
      host.innerHTML = values
        .map(function (v) {
          return (
            '<button type="button" class="chip ' +
            (key === "methods" ? toneFor(v) : "") +
            '" aria-pressed="false" data-value="' +
            esc(v) +
            '" title="' +
            esc(v) +
            '">' +
            esc(shortLabel(v)) +
            "</button>"
          );
        })
        .join("");
      host.addEventListener("click", function (ev) {
        var chip = ev.target.closest(".chip");
        if (!chip) return;
        var value = chip.getAttribute("data-value");
        var i = state[key].indexOf(value);
        if (i === -1) {
          state[key].push(value);
          chip.setAttribute("aria-pressed", "true");
        } else {
          state[key].splice(i, 1);
          chip.setAttribute("aria-pressed", "false");
        }
        render();
      });
    }

    chipRow("filter-methods", methodsInUse, "methods");

    var search = el("member-search");
    if (search) {
      search.addEventListener("input", function () {
        state.query = search.value.trim().toLowerCase();
        render();
      });
    }

    var reset = el("filter-reset");
    if (reset) {
      reset.addEventListener("click", function () {
        state = { methods: [], query: "" };
        if (search) search.value = "";
        document.querySelectorAll("#directory-controls .chip").forEach(function (c) {
          c.setAttribute("aria-pressed", "false");
        });
        render();
      });
    }

    function matches(m) {
      if (state.methods.length) {
        var has = (m.methods || []).some(function (t) {
          return state.methods.indexOf(t) !== -1;
        });
        if (!has) return false;
      }
      if (state.query) {
        var haystack = [m.name, m.program, m.blurb]
          .concat(m.methods || [])
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (haystack.indexOf(state.query) === -1) return false;
      }
      return true;
    }

    function render() {
      var shown = members.filter(matches);
      if (count) {
        count.textContent =
          shown.length === members.length
            ? members.length + (members.length === 1 ? " member" : " members")
            : shown.length + " of " + members.length + " members";
      }
      results.innerHTML = shown.length
        ? shown.map(memberHtml).join("")
        : '<div class="note"><h3>Nothing here</h3><p>Nobody matches that yet — ' +
          "try clearing a filter.</p></div>";
    }

    render();
  }

  /* --- resources -------------------------------------------------------- */

  function renderGlossary() {
    var host = el("glossary");
    if (!host) return;
    var terms = typeof GLOSSARY !== "undefined" && Array.isArray(GLOSSARY) ? GLOSSARY : [];
    var empty = el("glossary-empty");

    if (!terms.length) {
      if (empty) empty.classList.remove("hidden");
      host.classList.add("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");

    var sorted = terms.slice().sort(function (a, b) {
      return String(a.term).localeCompare(String(b.term));
    });

    host.innerHTML = sorted
      .map(function (t) {
        var fields =
          Array.isArray(t.fields) && t.fields.length
            ? ' <span class="pill">' + t.fields.map(esc).join('</span> <span class="pill">') + "</span>"
            : "";
        return (
          '<div class="row">' +
          '<p class="row__term">' +
          esc(t.term) +
          "</p>" +
          '<p class="row__def">' +
          esc(t.short) +
          fields +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderCanon() {
    var host = el("canon");
    if (!host) return;
    var items = typeof CANON !== "undefined" && Array.isArray(CANON) ? CANON : [];
    var empty = el("canon-empty");

    if (!items.length) {
      if (empty) empty.classList.remove("hidden");
      host.classList.add("hidden");
      return;
    }
    if (empty) empty.classList.add("hidden");

    host.innerHTML = items
      .map(function (c) {
        var meta = [c.authors, c.year].filter(Boolean).map(esc).join(" · ");
        return (
          '<article class="soft">' +
          '<h3 class="soft__title">' +
          linked(c.title, c.url) +
          "</h3>" +
          (meta ? '<p class="soft__meta">' + meta + "</p>" : "") +
          (c.note ? '<p class="soft__note">' + esc(c.note) + "</p>" : "") +
          "</article>"
        );
      })
      .join("");
  }

  function renderAnchors() {
    var host = el("anchors");
    if (!host) return;
    var items = typeof ANCHORS !== "undefined" && Array.isArray(ANCHORS) ? ANCHORS : [];
    if (!items.length) {
      host.classList.add("hidden");
      return;
    }
    host.innerHTML = items
      .map(function (a) {
        return (
          '<article class="soft">' +
          '<h3 class="soft__title">' +
          linked(a.name, a.url) +
          "</h3>" +
          (a.unit ? '<p class="soft__meta">' + esc(a.unit) + "</p>" : "") +
          "</article>"
        );
      })
      .join("");
  }

  /* --- nav ---------------------------------------------------------------*/

  function markCurrentPage() {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav__link[href]").forEach(function (link) {
      var target = link.getAttribute("href").split("/").pop().split("#")[0].toLowerCase();
      if (target === here || (here === "" && target === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* --- boot ------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    applySiteLinks();
    markCurrentPage();

    renderEvents(
      el("events-upcoming"),
      "upcoming",
      '<div class="note"><h3>Coming soon</h3><p>Next quarter&#39;s line-up is being finalized. ' +
        "Join and we&#39;ll send it to you.</p></div>"
    );

    renderEvents(
      el("events-past"),
      "past",
      '<div class="note"><h3>Nothing yet</h3><p>(CSS)² kicks off in Autumn 2026. Once a session ' +
        "has happened, its slides, notes, and reading lists show up here.</p></div>"
    );

    setupDirectory();
    renderGlossary();
    renderCanon();
    renderAnchors();
  });
})();
