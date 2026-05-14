(function () {
  "use strict";

  const STORAGE_KEY = "sportabzeichen-selection-v2";

  const state = {
    gender: null,
    age: null,
    selection: {} // { groupId: disciplineId }
  };

  const $ = (sel, root) => (root || document).querySelector(sel);

  // ---------- Storage ----------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.gender && DATA.genders.find(g => g.id === saved.gender)) state.gender = saved.gender;
      if (saved.age && DATA.ageGroups.find(a => a.id === saved.age)) state.age = saved.age;
      if (saved.selection && typeof saved.selection === "object") {
        Object.entries(saved.selection).forEach(([gid, did]) => {
          const grp = DATA.groups.find(g => g.id === gid);
          if (grp && grp.disciplines.find(d => d.id === did)) {
            state.selection[gid] = did;
          }
        });
      }
    } catch (e) {}
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---------- Routing ----------
  function parseHash() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "disziplin" && parts[1] && parts[2]) {
      return { name: "detail", groupId: parts[1], disciplineId: parts[2] };
    }
    if (parts[0] === "plan") return { name: "plan" };
    return { name: "home" };
  }

  function navigate(path) {
    if (location.hash === "#" + path) {
      render();
    } else {
      location.hash = "#" + path;
    }
  }

  // ---------- Utils ----------
  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function collectVideos(discipline, data) {
    const general = Array.isArray(discipline.videos) ? discipline.videos : [];
    const ageSpecific = (data && Array.isArray(data.videos)) ? data.videos : [];
    return ageSpecific.length ? ageSpecific.concat(general) : general;
  }

  function renderVideos(discipline, data) {
    const videos = collectVideos(discipline, data);
    if (!videos.length) return "";

    const items = videos.map(v => `
      <div class="video-item">
        <div class="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${escapeHtml(v.id)}?rel=0"
            title="${escapeHtml(v.title || "Übungsvideo")}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>
        </div>
        <div class="video-caption">
          <strong>${escapeHtml(v.title || "Übungsvideo")}</strong>
          ${v.note ? `<span class="video-note">${escapeHtml(v.note)}</span>` : ""}
        </div>
      </div>
    `).join("");

    return `
      <div class="detail-section">
        <h3>Videos zur Übung</h3>
        <p class="video-source">Aus dem offiziellen Übungsbooklet des DOSB.</p>
        <div class="videos-grid">${items}</div>
      </div>
    `;
  }

  function findDiscipline(groupId, disciplineId) {
    const grp = DATA.groups.find(g => g.id === groupId);
    if (!grp) return null;
    const disc = grp.disciplines.find(d => d.id === disciplineId);
    if (!disc) return null;
    return { group: grp, discipline: disc };
  }

  function selectionCount() {
    return DATA.groups.reduce((sum, g) => sum + (state.selection[g.id] ? 1 : 0), 0);
  }

  // ---------- Home view ----------
  function renderHome() {
    const app = $("#app");
    app.innerHTML = `
      <section class="filter-section" aria-label="Auswahl">
        <div class="filter-block">
          <h2 class="filter-label">Geschlecht</h2>
          <div class="filter-buttons" id="gender-buttons" role="radiogroup" aria-label="Geschlecht"></div>
        </div>
        <div class="filter-block">
          <h2 class="filter-label">Alter</h2>
          <div class="filter-buttons" id="age-buttons" role="radiogroup" aria-label="Altersgruppe"></div>
        </div>
      </section>

      <section class="info-box">
        <h3>So funktioniert's</h3>
        <p>Du musst aus <strong>jeder der vier Gruppen</strong> (Ausdauer, Kraft, Schnelligkeit, Koordination) <strong>eine Disziplin</strong> erfolgreich abschließen. Außerdem brauchst du einen <strong>Schwimmnachweis</strong> (z.B. Deutsches Schwimmabzeichen Bronze).</p>
        <p class="tip">Punkte: Bronze = 1, Silber = 2, Gold = 3. Gesamt: Bronze 4–7 · Silber 8–10 · Gold 11–12.</p>
        <p class="tip">Hak in jeder Gruppe eine Disziplin ab und klicke unten auf „Meinen Plan anzeigen".</p>
      </section>

      <div id="content" class="content"></div>
    `;

    renderFilters();
    renderGroups();
    renderPlanBar();
  }

  function renderFilters() {
    const genderHost = $("#gender-buttons");
    genderHost.innerHTML = "";
    DATA.genders.forEach(g => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.dataset.value = g.id;
      btn.innerHTML = `<span class="symbol" aria-hidden="true">${g.symbol}</span>${escapeHtml(g.label)}`;
      btn.addEventListener("click", () => {
        state.gender = g.id;
        saveState();
        renderFilters();
        renderGroups();
      });
      if (state.gender === g.id) { btn.classList.add("active"); btn.setAttribute("aria-checked", "true"); }
      genderHost.appendChild(btn);
    });

    const ageHost = $("#age-buttons");
    ageHost.innerHTML = "";
    DATA.ageGroups.forEach(a => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.dataset.value = a.id;
      btn.textContent = a.label;
      btn.addEventListener("click", () => {
        state.age = a.id;
        saveState();
        renderFilters();
        renderGroups();
      });
      if (state.age === a.id) { btn.classList.add("active"); btn.setAttribute("aria-checked", "true"); }
      ageHost.appendChild(btn);
    });
  }

  function renderGroups() {
    const host = $("#content");
    host.innerHTML = "";

    if (!state.gender || !state.age) {
      host.innerHTML = `
        <div class="placeholder">
          <span class="big-arrow">☝️</span>
          <p>Wähle oben dein <strong>Geschlecht</strong> und deine <strong>Altersgruppe</strong>, um die Anforderungen zu sehen.</p>
        </div>`;
      return;
    }

    DATA.groups.forEach(group => {
      const isSelected = !!state.selection[group.id];
      const section = document.createElement("section");
      section.className = "group" + (isSelected ? " has-selection" : "");
      section.innerHTML = `
        <div class="group-header">
          <div class="group-icon" aria-hidden="true">${group.icon}</div>
          <h2>${escapeHtml(group.label)}</h2>
          ${isSelected ? '<span class="group-check">✓ ausgewählt</span>' : ''}
        </div>
        <p class="group-description">${escapeHtml(group.description)}</p>
        <div class="disciplines"></div>
      `;
      const discHost = section.querySelector(".disciplines");

      group.disciplines.forEach(disc => {
        const data = disc.values[state.age];
        if (!data) return;
        const card = buildCard(group, disc, data);
        if (card) discHost.appendChild(card);
      });

      host.appendChild(section);
    });
  }

  function buildCard(group, disc, data) {
    const card = document.createElement("div");
    card.className = "card";
    if (disc.extended) card.classList.add("extended");
    if (state.selection[group.id] === disc.id) card.classList.add("selected");

    const values = data[state.gender];
    let medalsHtml;
    if (disc.type === "skill") {
      medalsHtml = `
        <div class="medals">
          <div class="medal medal-bronze"><div class="medal-label">Bronze</div><div class="medal-value is-text">Übung</div></div>
          <div class="medal medal-silber"><div class="medal-label">Silber</div><div class="medal-value is-text">Übung</div></div>
          <div class="medal medal-gold"><div class="medal-label">Gold</div><div class="medal-value is-text">Übung</div></div>
        </div>`;
    } else {
      if (!values) return null;
      medalsHtml = `
        <div class="medals">
          <div class="medal medal-bronze"><div class="medal-label">Bronze</div><div class="medal-value">${escapeHtml(values[0])}</div></div>
          <div class="medal medal-silber"><div class="medal-label">Silber</div><div class="medal-value">${escapeHtml(values[1])}</div></div>
          <div class="medal medal-gold"><div class="medal-label">Gold</div><div class="medal-value">${escapeHtml(values[2])}</div></div>
        </div>`;
    }

    const variantHtml = data.variant ? `<p class="card-variant">${escapeHtml(data.variant)}</p>` : "";
    const noteHtml = data.note ? `<p class="card-note">${escapeHtml(data.note)}</p>` : "";
    const badge = disc.extended ? `<span class="card-badge">erw.</span>` : "";
    const unit = disc.type === "skill" ? "Tippen für Beschreibung" : (disc.unit || "");
    const unitHtml = unit ? `<p class="card-unit">${escapeHtml(unit)}</p>` : "";
    const isChecked = state.selection[group.id] === disc.id;

    card.innerHTML = `
      <div class="card-body" data-action="open">
        <div class="card-top">
          <h3 class="card-title">${escapeHtml(disc.label)} ${badge}</h3>
          <input type="checkbox" class="card-check" data-action="select" aria-label="Diese Disziplin auswählen" ${isChecked ? 'checked' : ''}>
        </div>
        ${variantHtml}
        ${noteHtml}
        ${medalsHtml}
        ${unitHtml}
      </div>
    `;

    const checkbox = card.querySelector(".card-check");
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSelection(group.id, disc.id);
    });

    const body = card.querySelector(".card-body");
    body.addEventListener("click", (e) => {
      if (e.target === checkbox) return;
      navigate(`/disziplin/${group.id}/${disc.id}`);
    });

    return card;
  }

  function toggleSelection(groupId, disciplineId) {
    if (state.selection[groupId] === disciplineId) {
      delete state.selection[groupId];
    } else {
      state.selection[groupId] = disciplineId;
    }
    saveState();
    renderGroups();
    renderPlanBar();
  }

  function renderPlanBar() {
    let bar = $("#plan-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "plan-bar";
      bar.id = "plan-bar";
      document.body.appendChild(bar);
    }
    const count = selectionCount();
    const ready = count === 4;

    bar.innerHTML = `
      <div class="plan-bar-inner">
        <div class="plan-bar-status">
          <div class="plan-progress" aria-label="Auswahl-Fortschritt">
            ${DATA.groups.map(g => `<span class="plan-progress-dot ${state.selection[g.id] ? 'filled' : ''}" title="${escapeHtml(g.label)}"></span>`).join("")}
          </div>
          <span class="plan-status-text"><strong>${count}/4</strong> Disziplinen ausgewählt</span>
        </div>
        <button class="plan-btn" id="plan-btn" ${ready ? '' : 'disabled'}>Meinen Plan anzeigen →</button>
      </div>
    `;
    $("#plan-btn").addEventListener("click", () => {
      if (ready) navigate("/plan");
    });
  }

  function removePlanBar() {
    const bar = $("#plan-bar");
    if (bar) bar.remove();
  }

  // ---------- Detail view ----------
  function renderDetail(groupId, disciplineId) {
    removePlanBar();
    const found = findDiscipline(groupId, disciplineId);
    if (!found) { navigate("/"); return; }
    const { group, discipline } = found;

    // If gender or age not set, ask user gently but still show generic info
    const hasContext = state.gender && state.age;
    const data = hasContext ? discipline.values[state.age] : null;
    const isSelected = state.selection[group.id] === discipline.id;

    const app = $("#app");

    let medalsHtml = "";
    if (hasContext && data) {
      if (discipline.type === "skill") {
        medalsHtml = `
          <div class="detail-medals">
            <div class="detail-medal bronze">
              <div class="detail-medal-label">Bronze</div>
              <div class="detail-medal-text">${escapeHtml(data.bronze)}</div>
            </div>
            <div class="detail-medal silber">
              <div class="detail-medal-label">Silber</div>
              <div class="detail-medal-text">${escapeHtml(data.silber)}</div>
            </div>
            <div class="detail-medal gold">
              <div class="detail-medal-label">Gold</div>
              <div class="detail-medal-text">${escapeHtml(data.gold)}</div>
            </div>
          </div>
          <p class="gym-note">Beim Gerätturnen wird nur „geschafft / nicht geschafft" bewertet. Achtet auf Sicherheitsstellung — bitte mit eurer Sportlehrkraft trainieren.</p>
        `;
      } else {
        const values = data[state.gender];
        const unit = discipline.unit || "";
        medalsHtml = `
          <div class="detail-medals">
            <div class="detail-medal bronze">
              <div class="detail-medal-label">Bronze</div>
              <div class="detail-medal-value">${escapeHtml(values[0])}<span class="detail-medal-unit">${escapeHtml(unit)}</span></div>
            </div>
            <div class="detail-medal silber">
              <div class="detail-medal-label">Silber</div>
              <div class="detail-medal-value">${escapeHtml(values[1])}<span class="detail-medal-unit">${escapeHtml(unit)}</span></div>
            </div>
            <div class="detail-medal gold">
              <div class="detail-medal-label">Gold</div>
              <div class="detail-medal-value">${escapeHtml(values[2])}<span class="detail-medal-unit">${escapeHtml(unit)}</span></div>
            </div>
          </div>
        `;
      }
    } else {
      medalsHtml = `
        <div class="placeholder-block">
          <div class="icon">ℹ️</div>
          <div class="text">Wähle auf der <a href="#/">Startseite</a> dein Geschlecht und Alter, dann werden hier die konkreten Anforderungen für dich angezeigt.</div>
        </div>
      `;
    }

    const tipsHtml = discipline.tips && discipline.tips.length
      ? `<ul class="detail-tips">${discipline.tips.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
      : "";

    const variantNote = (data && data.variant) ? `<p class="detail-meta"><strong>Aufgabe für dein Alter:</strong> ${escapeHtml(data.variant)}${data.note ? " · " + escapeHtml(data.note) : ""}</p>` : "";
    const contextHtml = hasContext
      ? `<p class="detail-meta">${escapeHtml(DATA.genders.find(g => g.id === state.gender).label)} · ${escapeHtml(DATA.ageGroups.find(a => a.id === state.age).label)}</p>`
      : "";

    app.innerHTML = `
      <article class="detail-page">
        <nav class="breadcrumb" aria-label="Pfad">
          <a href="#/">Übersicht</a>
          <span class="breadcrumb-sep">›</span>
          <span>${escapeHtml(group.icon)} ${escapeHtml(group.label)}</span>
          <span class="breadcrumb-sep">›</span>
          <span>${escapeHtml(discipline.label)}</span>
        </nav>

        <h1 class="detail-title">${escapeHtml(discipline.label)}</h1>
        ${contextHtml}
        ${variantNote}

        ${discipline.short ? `<p class="detail-short">${escapeHtml(discipline.short)}</p>` : ""}

        <div class="detail-section">
          <h3>Wie sieht die Disziplin aus?</h3>
          <p>${escapeHtml(discipline.howTo || "Beschreibung folgt.")}</p>
        </div>

        ${discipline.materials ? `
          <div class="detail-section">
            <h3>Was du brauchst</h3>
            <p>${escapeHtml(discipline.materials)}</p>
          </div>
        ` : ""}

        <div class="detail-section">
          <h3>Anforderungen</h3>
          ${medalsHtml}
        </div>

        ${tipsHtml ? `
          <div class="detail-section">
            <h3>Tipps</h3>
            ${tipsHtml}
          </div>
        ` : ""}

        ${renderVideos(discipline, data)}

        <div class="detail-section">
          <h3>Übungsbooklet</h3>
          <div class="placeholder-block">
            <div class="icon">📘</div>
            <div class="text">Hier wird das Übungsbooklet verlinkt, mit dem du systematisch auf die Disziplin hin trainieren kannst.</div>
          </div>
        </div>

        <div class="detail-actions">
          <button class="btn-primary" id="select-btn">${isSelected ? '✓ Für meinen Plan ausgewählt' : 'Für meinen Plan auswählen'}</button>
          <a class="btn-secondary" href="#/">← Zurück zur Übersicht</a>
        </div>
      </article>
    `;

    $("#select-btn").addEventListener("click", () => {
      toggleSelection(group.id, discipline.id);
      renderDetail(groupId, disciplineId);
    });
  }

  // ---------- Plan view ----------
  function renderPlan() {
    removePlanBar();
    const app = $("#app");
    const count = selectionCount();

    if (count < 4 || !state.gender || !state.age) {
      app.innerHTML = `
        <div class="placeholder">
          <span class="big-arrow">🛟</span>
          <p>Dein Plan ist noch nicht vollständig.</p>
          <p><a href="#/" class="btn-primary" style="margin-top: 12px;">Zurück zur Übersicht</a></p>
        </div>
      `;
      return;
    }

    const genderLabel = DATA.genders.find(g => g.id === state.gender).label;
    const ageLabel = DATA.ageGroups.find(a => a.id === state.age).label;

    const cards = DATA.groups.map(group => {
      const discId = state.selection[group.id];
      const disc = group.disciplines.find(d => d.id === discId);
      if (!disc) return "";
      const data = disc.values[state.age];
      const variantText = data && data.variant ? data.variant : "";

      let valuesPreview = "";
      if (disc.type !== "skill" && data) {
        const v = data[state.gender];
        valuesPreview = `
          <div class="medals">
            <div class="medal medal-bronze"><div class="medal-label">Bronze</div><div class="medal-value">${escapeHtml(v[0])}</div></div>
            <div class="medal medal-silber"><div class="medal-label">Silber</div><div class="medal-value">${escapeHtml(v[1])}</div></div>
            <div class="medal medal-gold"><div class="medal-label">Gold</div><div class="medal-value">${escapeHtml(v[2])}</div></div>
          </div>
          ${disc.unit ? `<p class="card-unit">${escapeHtml(disc.unit)}</p>` : ""}
        `;
      } else if (data) {
        valuesPreview = `
          <div class="medals">
            <div class="medal medal-bronze"><div class="medal-label">Bronze</div><div class="medal-value is-text">Übung</div></div>
            <div class="medal medal-silber"><div class="medal-label">Silber</div><div class="medal-value is-text">Übung</div></div>
            <div class="medal medal-gold"><div class="medal-label">Gold</div><div class="medal-value is-text">Übung</div></div>
          </div>
        `;
      }

      return `
        <a class="plan-card" href="#/disziplin/${escapeHtml(group.id)}/${escapeHtml(disc.id)}">
          <div class="plan-card-head">
            <div class="plan-card-icon">${escapeHtml(group.icon)}</div>
            <div>
              <div class="plan-card-group">${escapeHtml(group.label)}</div>
              <h3 class="plan-card-name">${escapeHtml(disc.label)}</h3>
              ${variantText ? `<p class="plan-card-variant">${escapeHtml(variantText)}</p>` : ""}
            </div>
          </div>
          ${valuesPreview}
        </a>
      `;
    }).join("");

    app.innerHTML = `
      <div class="plan-page">
        <nav class="breadcrumb" aria-label="Pfad">
          <a href="#/">Übersicht</a>
          <span class="breadcrumb-sep">›</span>
          <span>Mein Plan</span>
        </nav>

        <h1 class="plan-page-title">Dein Sportabzeichen-Plan</h1>
        <p class="plan-page-meta">${escapeHtml(genderLabel)} · ${escapeHtml(ageLabel)} · Schwimmnachweis nicht vergessen!</p>

        <div class="plan-grid">${cards}</div>

        <p class="plan-print-hint">Tipp: Tippe auf eine Disziplin, um zur Detailbeschreibung zu kommen. Du kannst diese Seite auch über deinen Browser ausdrucken (⌘P bzw. Strg+P).</p>

        <div class="detail-actions print-hide">
          <button class="btn-primary" onclick="window.print()">🖨️ Plan drucken</button>
          <a class="btn-secondary" href="#/">← Plan ändern</a>
        </div>
      </div>
    `;
  }

  // ---------- Main render ----------
  function render() {
    window.scrollTo(0, 0);
    const route = parseHash();
    if (route.name === "home") {
      renderHome();
    } else if (route.name === "detail") {
      renderDetail(route.groupId, route.disciplineId);
    } else if (route.name === "plan") {
      renderPlan();
    } else {
      renderHome();
    }
  }

  window.addEventListener("hashchange", render);

  loadState();
  render();
})();
