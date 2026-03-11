// ═══════════════════════════════════════════════════════
// AJK SITE CONTROL — DATA LAYER
// Hierarchical location model: project → block → level → area
// ═══════════════════════════════════════════════════════

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

let users         = loadData("ajk_users",    [{ id:"u1",name:"Chris"},{id:"u2",name:"Matt"},{id:"u3",name:"Rafal"}]);
let projects      = loadData("ajk_projects", []);
let projectBlocks = loadData("ajk_blocks",   []);
let projectLevels = loadData("ajk_levels",   []);
let projectAreas  = loadData("ajk_areas",    []);
let forms         = loadData("ajk_forms",    []);   // form register
let actions       = loadData("ajk_actions",  []);

function saveData() {
  localStorage.setItem("ajk_users",    JSON.stringify(users));
  localStorage.setItem("ajk_projects", JSON.stringify(projects));
  localStorage.setItem("ajk_blocks",   JSON.stringify(projectBlocks));
  localStorage.setItem("ajk_levels",   JSON.stringify(projectLevels));
  localStorage.setItem("ajk_areas",    JSON.stringify(projectAreas));
  localStorage.setItem("ajk_forms",    JSON.stringify(forms));
  localStorage.setItem("ajk_actions",  JSON.stringify(actions));
}
