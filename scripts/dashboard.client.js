/*
 * dashboard.client.js -- browser half of the control room.
 *
 * Served verbatim at /dashboard.js by scripts/dashboard.mjs. It lives in its
 * own file on purpose: it used to be inlined inside a template literal, which
 * silently ate every backslash, so `\*\*` became `**` and turned a regex into
 * a block comment. Anything with an escape in it belongs here, not there.
 *
 * Runs after the inline script, so `toast()` is already defined.
 */

/* global toast */

var drawer = document.getElementById("drawer"),
  scrim = document.getElementById("scrim"),
  lb = document.getElementById("lightbox");

function h(x) {
  return String(x == null ? "" : x)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1048576) return (n / 1024).toFixed(0) + " KB";
  return (n / 1048576).toFixed(1) + " MB";
}

/* The script source is markdown. Render only what a script file actually uses. */
function md(src) {
  // These files are CRLF on disk. Splitting on "\n" alone leaves a trailing
  // "\r", which is a line terminator: "." will not cross it and "$" will not
  // match before it, so every heading and list line silently failed to match.
  var lines = h(src).split(/\r?\n/);
  var out = [];
  var inList = false;

  function inline(x) {
    return x
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  }
  function closeList() {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  }

  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];

    if (/^---+\s*$/.test(l)) {
      closeList();
      out.push("<hr>");
      continue;
    }
    var hd = l.match(/^(#{1,4})\s+(.*)$/);
    if (hd) {
      closeList();
      var lvl = Math.min(hd[1].length + 2, 6);
      out.push("<h" + lvl + ">" + inline(hd[2]) + "</h" + lvl + ">");
      continue;
    }
    var li = l.match(/^[-*]\s+(.*)$/);
    if (li) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push("<li>" + inline(li[1]) + "</li>");
      continue;
    }
    if (!l.trim()) {
      closeList();
      continue;
    }
    closeList();
    out.push("<p>" + inline(l) + "</p>");
  }
  closeList();
  return "<div class='doc'>" + out.join("") + "</div>";
}

/* The deck spec, rendered as the slides it describes. */
function deck(n) {
  if (!n || !n.slides)
    return "<p class='dr-empty'>No deck spec in content/sources.</p>";
  var out = "";
  if (n.sections && n.sections.length) {
    out += "<ul class='deck-sections'>";
    for (var i = 0; i < n.sections.length; i++) {
      out +=
        "<li><b>" +
        h(n.sections[i].name) +
        "</b> · " +
        h(n.sections[i].subtitle || "") +
        "</li>";
    }
    out += "</ul>";
  }
  for (var j = 0; j < n.slides.length; j++) {
    var s = n.slides[j];
    var cls = "slide";
    if (s.type === "title") cls += " title-slide";
    if (s.type === "close") cls += " close-slide";
    out += "<div class='" + cls + "'>";
    out +=
      "<span class='slide-n'>" +
      (j + 1) +
      " · " +
      h(s.type) +
      (s.section
        ? " · " + h((n.sections[s.section - 1] || {}).name || "")
        : "") +
      "</span>";
    if (s.headline) out += "<h4>" + h(s.headline) + "</h4>";
    if (s.line) out += "<h4>" + h(s.line) + "</h4>";
    if (s.quote) out += "<p class='stand'>" + h(s.quote) + "</p>";
    if (s.standfirst) out += "<p class='stand'>" + h(s.standfirst) + "</p>";
    if (s.rows)
      for (var k = 0; k < s.rows.length; k++) {
        out +=
          "<div class='slide-row'><b>" +
          h(s.rows[k].label) +
          "</b><span>" +
          h(s.rows[k].body) +
          "</span></div>";
      }
    out += "</div>";
  }
  return out;
}

function infoSpec(g) {
  if (!g) return "";
  var out =
    "<div class='slide'><span class='slide-n'>" + h(g.type || "spec") + "</span>";
  if (g.title) out += "<h4>" + h(g.title) + "</h4>";
  if (g.standfirst) out += "<p class='stand'>" + h(g.standfirst) + "</p>";
  var items = g.items || g.rows || [];
  for (var i = 0; i < items.length; i++) {
    out +=
      "<div class='slide-row'><b>" +
      h(items[i].label || items[i].head || "") +
      "</b><span>" +
      h(items[i].body || "") +
      "</span></div>";
  }
  return out + "</div>";
}

function imgPane(a, kind, label) {
  var f = null;
  for (var i = 0; i < a.files.length; i++) if (a.files[i].kind === kind) f = a.files[i];
  if (!f) return "<p class='dr-empty'>No " + label.toLowerCase() + " built yet.</p>";
  var url =
    "/asset/" + encodeURIComponent(a.slug) + "/" + encodeURIComponent(f.name);
  return (
    "<img class='dr-img' src='" + url + "' alt='" + h(label) + "' loading='lazy'>" +
    "<p class='dr-note'>" + h(f.name) + " · " + bytes(f.size) +
    " · click to enlarge</p>"
  );
}

function fileList(a) {
  if (!a.files.length)
    return "<p class='dr-empty'>Nothing built for this briefing yet.</p>";
  var out = "<ul class='files'>";
  for (var i = 0; i < a.files.length; i++) {
    var f = a.files[i];
    out +=
      "<li><span class='f-kind'>" + h(f.kind) + "</span>" +
      "<span class='f-name'>" + h(f.name) + "</span>" +
      "<span class='f-size'>" + bytes(f.size) + "</span>" +
      '<button class="f-open" data-open="' + h(f.name) +
      '" data-slug="' + h(a.slug) + '">Open</button></li>';
  }
  out +=
    "</ul><p class='dr-note'>Open launches the file in its own application. Folder: content/social/" +
    h(a.folder || "none") + "/</p>";
  return out;
}

var PANES = [
  {
    id: "cover",
    label: "Cover",
    fn: function (a) {
      return imgPane(a, "cover", "Cover");
    },
  },
  {
    id: "info",
    label: "Infographic",
    fn: function (a) {
      var p = imgPane(a, "infographic", "Infographic");
      return (
        p +
        (a.infographic
          ? "<h3 style='margin-top:24px'>Spec</h3>" + infoSpec(a.infographic)
          : "")
      );
    },
  },
  {
    id: "script",
    label: "Script",
    fn: function (a) {
      return a.script
        ? md(a.script)
        : "<p class='dr-empty'>No script source in content/sources.</p>";
    },
  },
  {
    id: "notes",
    label: "Session notes",
    fn: function (a) {
      return deck(a.notes);
    },
  },
  {
    id: "files",
    label: "Files",
    fn: function (a) {
      return fileList(a);
    },
  },
];

function closeDrawer() {
  drawer.hidden = true;
  scrim.hidden = true;
  document.body.style.overflow = "";
}

async function openAssets(slug, pane) {
  document.getElementById("dr-title").textContent = slug;
  document.getElementById("dr-eyebrow").textContent = "Loading";
  document.getElementById("dr-tabs").innerHTML = "";
  document.getElementById("dr-body").innerHTML = "";
  drawer.hidden = false;
  scrim.hidden = false;
  document.body.style.overflow = "hidden";

  var a;
  try {
    var res = await fetch("/api/assets?slug=" + encodeURIComponent(slug));
    a = await res.json();
  } catch (e) {
    document.getElementById("dr-body").innerHTML =
      "<p class='dr-empty'>Could not read the asset folder.</p>";
    return;
  }

  document.getElementById("dr-eyebrow").textContent =
    a.files.length + " files · " + (a.folder || "no folder");

  var tabs = "";
  var body = "";
  var active = 0;
  for (var p = 0; p < PANES.length; p++) if (PANES[p].id === pane) active = p;
  for (var i = 0; i < PANES.length; i++) {
    var on = i === active ? " on" : "";
    var html;
    try {
      html = PANES[i].fn(a);
    } catch (err) {
      html = "<p class='dr-empty'>Could not render this pane: " + h(err.message) + "</p>";
    }
    tabs +=
      "<button data-pane='" + PANES[i].id + "' class='" + (i === active ? "on" : "") +
      "'>" + PANES[i].label + "</button>";
    body += "<div class='dr-pane" + on + "' id='pane-" + PANES[i].id + "'>" + html + "</div>";
  }
  document.getElementById("dr-tabs").innerHTML = tabs;
  document.getElementById("dr-body").innerHTML = body;
}

document.addEventListener("click", function (e) {
  var b = e.target.closest("[data-assets]");
  if (b && !b.disabled) {
    openAssets(b.dataset.assets);
    return;
  }

  var tab = e.target.closest("[data-pane]");
  if (tab) {
    var panes = document.querySelectorAll(".dr-pane");
    for (var i = 0; i < panes.length; i++) panes[i].classList.remove("on");
    var btns = document.querySelectorAll(".dr-tabs button");
    for (var j = 0; j < btns.length; j++) btns[j].classList.remove("on");
    tab.classList.add("on");
    var target = document.getElementById("pane-" + tab.dataset.pane);
    if (target) target.classList.add("on");
    document.getElementById("dr-body").scrollTop = 0;
    return;
  }

  if (e.target.id === "dr-close" || e.target.id === "scrim") {
    closeDrawer();
    return;
  }

  if (e.target.classList.contains("dr-img")) {
    document.getElementById("lb-img").src = e.target.src;
    lb.hidden = false;
    return;
  }
  if (e.target.closest("#lightbox")) {
    lb.hidden = true;
    return;
  }

  var op = e.target.closest("[data-open]");
  if (op) {
    fetch("/api/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: op.dataset.slug, name: op.dataset.open }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (o) {
        toast(o.ok ? "Opening " + op.dataset.open : o.error, !o.ok);
      })
      .catch(function () {
        toast("Could not open the file", true);
      });
  }
});

/* Deep link: #assets/<slug> opens that drawer straight away. */
function assetHash() {
  var m = (location.hash || "").match(/^#assets\/([^\/]+)(?:\/(.+))?$/);
  if (m) openAssets(decodeURIComponent(m[1]), m[2] || null);
}
addEventListener("hashchange", assetHash);
assetHash();

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  if (!lb.hidden) {
    lb.hidden = true;
    return;
  }
  if (!drawer.hidden) closeDrawer();
});
