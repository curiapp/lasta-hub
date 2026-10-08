const state = {
  definition: null,
  dashboard: null,
  programmes: [],
  tasks: [],
  artifacts: [],
  audit: [],
  selectedProgrammeId: null,
  selectedTask: null,
  view: "work",
  role: localStorage.getItem("workflowRole") || "pdu"
};

const app = document.querySelector("#app");
const roleSelect = document.querySelector("#roleSelect");
const refreshButton = document.querySelector("#refreshButton");
const taskDialog = document.querySelector("#taskDialog");
const taskForm = document.querySelector("#taskForm");
const taskFields = document.querySelector("#taskFields");
const artifactFields = document.querySelector("#artifactFields");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogStage = document.querySelector("#dialogStage");
const closeDialogButton = document.querySelector("#closeDialogButton");
const cancelTaskButton = document.querySelector("#cancelTaskButton");

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function byStageOrder(a, b) {
  const orderA = state.definition.stages.find((stage) => stage.id === a.stageId)?.order ?? 0;
  const orderB = state.definition.stages.find((stage) => stage.id === b.stageId)?.order ?? 0;
  return orderA - orderB;
}

function taskDefinition(id) {
  return state.definition.tasks.find((task) => task.id === id);
}

function roleName(roleId) {
  return state.definition.roles.find((role) => role.id === roleId)?.name ?? roleId;
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  window.setTimeout(() => toast.remove(), 3500);
}

async function load() {
  const data = await api("/api/bootstrap");
  Object.assign(state, data);
  if (!state.selectedProgrammeId && state.programmes[0]) {
    state.selectedProgrammeId = state.programmes[0].id;
  }
  renderRoleSelect();
  render();
}

function renderRoleSelect() {
  roleSelect.innerHTML = state.definition.roles
    .map((role) => `<option value="${escapeHtml(role.id)}">${escapeHtml(role.name)}</option>`)
    .join("");
  roleSelect.value = state.role;
}

function render() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });

  if (state.view === "definition") {
    renderDefinition();
    return;
  }
  if (state.view === "audit") {
    renderAudit();
    return;
  }
  renderWork();
}

function renderMetrics() {
  const counts = state.dashboard.processCounts || {};
  return `
    <section class="metrics">
      <div class="metric"><span class="eyebrow">Programmes</span><strong>${state.dashboard.programmeCount}</strong></div>
      <div class="metric"><span class="eyebrow">Active Tasks</span><strong>${state.dashboard.activeTaskCount}</strong></div>
      <div class="metric"><span class="eyebrow">Completed Tasks</span><strong>${state.dashboard.completedTaskCount}</strong></div>
      <div class="metric"><span class="eyebrow">Running</span><strong>${counts.running ?? 0}</strong></div>
    </section>
  `;
}

function renderWork() {
  const selected = state.programmes.find((programme) => programme.id === state.selectedProgrammeId) ?? null;
  const roleTasks = state.tasks.filter((task) => {
    return task.status === "active" && task.ownerRoles.includes(state.role);
  });

  app.innerHTML = `
    ${renderMetrics()}
    <section class="work-grid">
      <aside class="panel">
        <div class="panel-head">
          <h2>Programmes</h2>
        </div>
        <div class="panel-body">
          ${renderCreateProgrammeForm()}
          <div class="programme-list" id="programmeList">
            ${renderProgrammeList()}
          </div>
        </div>
      </aside>
      <section class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">${selected ? escapeHtml(selected.code) : "No Programme"}</p>
            <h2>${selected ? escapeHtml(selected.title) : "Workflow"}</h2>
          </div>
          ${selected ? `<span class="status-pill ${escapeHtml(selected.status)}">${escapeHtml(selected.status)}</span>` : ""}
        </div>
        <div class="panel-body" id="programmeDetail">
          ${selected ? renderProgrammeDetail(selected) : `<p class="empty">No programme selected.</p>`}
        </div>
      </section>
      <aside class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">${escapeHtml(roleName(state.role))}</p>
            <h2>Inbox</h2>
          </div>
          <span class="role-pill">${roleTasks.length}</span>
        </div>
        <div class="panel-body">
          <div class="task-list">
            ${roleTasks.length ? roleTasks.map(renderInboxTask).join("") : `<p class="empty">No active tasks for this role.</p>`}
          </div>
        </div>
      </aside>
    </section>
  `;

  document.querySelector("#createProgrammeForm").addEventListener("submit", createProgrammeFromForm);
  document.querySelectorAll("[data-select-programme]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedProgrammeId = button.dataset.selectProgramme;
      renderWork();
    });
  });
  document.querySelectorAll("[data-open-task]").forEach((button) => {
    button.addEventListener("click", () => openTask(button.dataset.openTask));
  });
}

function renderCreateProgrammeForm() {
  return `
    <form class="create-form" id="createProgrammeForm">
      <div class="field">
        <label for="programmeTitle">Title</label>
        <input id="programmeTitle" name="title" required>
      </div>
      <div class="field">
        <label for="programmeCode">Code</label>
        <input id="programmeCode" name="code" required>
      </div>
      <div class="field">
        <label for="programmeFaculty">Faculty</label>
        <input id="programmeFaculty" name="faculty" required>
      </div>
      <div class="field">
        <label for="programmeDepartment">Department</label>
        <input id="programmeDepartment" name="department" required>
      </div>
      <div class="field">
        <label for="programmeLevel">Level</label>
        <select id="programmeLevel" name="level" required>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7" selected>7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>
      <button class="primary-button" type="submit">Create Programme</button>
    </form>
  `;
}

function renderProgrammeList() {
  if (!state.programmes.length) return `<p class="empty">No programmes yet.</p>`;
  return state.programmes.map((programme) => `
    <button class="programme-card ${programme.id === state.selectedProgrammeId ? "is-selected" : ""}" type="button" data-select-programme="${programme.id}">
      <div class="card-title">
        <h3>${escapeHtml(programme.title)}</h3>
        <span class="status-pill ${escapeHtml(programme.status)}">${escapeHtml(programme.status)}</span>
      </div>
      <p class="meta">${escapeHtml(programme.code)} / ${escapeHtml(programme.department)} / Level ${escapeHtml(programme.level)}</p>
    </button>
  `).join("");
}

function renderProgrammeDetail(programme) {
  const process = state.dashboard ? state.tasks.find((task) => task.programmeId === programme.id) : null;
  const programmeTasks = state.tasks
    .filter((task) => task.programmeId === programme.id)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const activeStageIds = new Set(programmeTasks.filter((task) => task.status === "active").map((task) => task.stageId));
  const doneStageIds = new Set(programmeTasks.filter((task) => task.status === "completed").map((task) => task.stageId));
  const programmeArtifacts = state.artifacts.filter((artifact) => artifact.programmeId === programme.id);

  return `
    <div class="stage-map">
      ${state.definition.stages.map((stage) => `
        <div class="stage-node ${activeStageIds.has(stage.id) ? "is-active" : ""} ${doneStageIds.has(stage.id) ? "is-done" : ""}">
          <span>${String(stage.order).padStart(2, "0")}</span>
          <strong>${escapeHtml(stage.name)}</strong>
        </div>
      `).join("")}
    </div>
    <div class="task-list">
      ${programmeTasks.length ? programmeTasks.map(renderProgrammeTask).join("") : `<p class="empty">No tasks created.</p>`}
    </div>
    <div class="panel-head" style="padding-left:0;padding-right:0;margin-top:14px">
      <h2>Artifacts</h2>
      <span class="role-pill">${programmeArtifacts.length}</span>
    </div>
    <div class="artifact-list">
      ${programmeArtifacts.length ? programmeArtifacts.map(renderArtifact).join("") : `<p class="empty">No artifacts captured.</p>`}
    </div>
  `;
}

function renderProgrammeTask(task) {
  const definition = taskDefinition(task.definitionId);
  const canOpen = task.status === "active" && task.ownerRoles.includes(state.role);
  return `
    <article class="task-card">
      <div class="card-title">
        <div>
          <p class="eyebrow">${escapeHtml(task.stageName)}</p>
          <h3>${escapeHtml(task.name)}</h3>
          <p class="meta">${escapeHtml(task.ownerRoles.map(roleName).join(", "))}</p>
        </div>
        <span class="status-pill ${escapeHtml(task.status)}">${escapeHtml(task.status)}</span>
      </div>
      ${task.completedAt ? `<p class="meta">Completed ${escapeHtml(formatDate(task.completedAt))}</p>` : ""}
      ${task.formData ? renderFormData(task.formData) : ""}
      <div class="task-actions">
        ${canOpen ? `<button class="primary-button" type="button" data-open-task="${task.id}">${escapeHtml(definition.transitions[0]?.label || "Submit")}</button>` : ""}
      </div>
    </article>
  `;
}

function renderInboxTask(task) {
  const programme = state.programmes.find((item) => item.id === task.programmeId);
  const definition = taskDefinition(task.definitionId);
  return `
    <article class="task-card">
      <p class="eyebrow">${escapeHtml(task.stageName)}</p>
      <h3>${escapeHtml(task.name)}</h3>
      <p class="meta">${escapeHtml(programme?.title || "Programme")} / ${escapeHtml(programme?.code || "")}</p>
      <div class="task-actions">
        <button class="primary-button" type="button" data-open-task="${task.id}">${escapeHtml(definition.transitions[0]?.label || "Submit")}</button>
      </div>
    </article>
  `;
}

function renderFormData(formData) {
  const rows = Object.entries(formData).filter(([, value]) => value !== "");
  if (!rows.length) return "";
  return `
    <dl class="meta">
      ${rows.map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join("")}
    </dl>
  `;
}

function renderArtifact(artifact) {
  return `
    <article class="artifact-item">
      <div class="card-title">
        <h3>${escapeHtml(artifact.title)}</h3>
        <span class="role-pill">${escapeHtml(artifact.type)}</span>
      </div>
      <p class="meta">${escapeHtml(artifact.reference || "No reference")} / ${escapeHtml(formatDate(artifact.createdAt))}</p>
    </article>
  `;
}

async function createProgrammeFromForm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const payload = Object.fromEntries(form.entries());
  try {
    const result = await api("/api/programmes", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    state.selectedProgrammeId = result.programme.id;
    await load();
    showToast("Programme created");
  } catch (error) {
    showToast(error.message);
  }
}

function openTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;
  const definition = taskDefinition(task.definitionId);
  state.selectedTask = task;

  dialogTitle.textContent = definition.name;
  dialogStage.textContent = task.stageName;
  taskFields.innerHTML = (definition.form ?? []).map(renderField).join("");
  artifactFields.innerHTML = `
    <p class="eyebrow">Artifacts</p>
    ${(definition.artifacts ?? []).map(renderArtifactField).join("")}
  `;
  taskDialog.showModal();
}

function renderField(field) {
  const required = field.required ? "required" : "";
  if (field.type === "textarea") {
    return `
      <div class="field">
        <label for="field-${escapeHtml(field.key)}">${escapeHtml(field.label)}</label>
        <textarea id="field-${escapeHtml(field.key)}" name="${escapeHtml(field.key)}" ${required}></textarea>
      </div>
    `;
  }
  if (field.type === "select") {
    return `
      <div class="field">
        <label for="field-${escapeHtml(field.key)}">${escapeHtml(field.label)}</label>
        <select id="field-${escapeHtml(field.key)}" name="${escapeHtml(field.key)}" ${required}>
          <option value=""></option>
          ${(field.options ?? []).map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
        </select>
      </div>
    `;
  }
  return `
    <div class="field">
      <label for="field-${escapeHtml(field.key)}">${escapeHtml(field.label)}</label>
      <input id="field-${escapeHtml(field.key)}" name="${escapeHtml(field.key)}" type="${escapeHtml(field.type || "text")}" ${required}>
    </div>
  `;
}

function renderArtifactField(artifact) {
  const required = artifact.required ? "required" : "";
  return `
    <div class="artifact-row" data-artifact="${escapeHtml(artifact.key)}">
      <div class="field">
        <label>Type</label>
        <input class="artifact-input" value="${escapeHtml(artifact.label)}" readonly>
      </div>
      <div class="field">
        <label>Title</label>
        <input class="artifact-input" name="artifact-title-${escapeHtml(artifact.key)}" value="${escapeHtml(artifact.label)}" ${required}>
      </div>
      <div class="field">
        <label>Reference</label>
        <input class="artifact-input" name="artifact-reference-${escapeHtml(artifact.key)}" placeholder="File name, URL, archive ID" ${required}>
      </div>
    </div>
  `;
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selectedTask) return;

  const definition = taskDefinition(state.selectedTask.definitionId);
  const form = new FormData(taskForm);
  const formData = {};
  for (const field of definition.form ?? []) {
    formData[field.key] = form.get(field.key) ?? "";
  }

  const artifacts = (definition.artifacts ?? []).map((artifact) => ({
    type: artifact.key,
    title: form.get(`artifact-title-${artifact.key}`) ?? artifact.label,
    reference: form.get(`artifact-reference-${artifact.key}`) ?? ""
  }));

  try {
    await api(`/api/tasks/${state.selectedTask.id}/complete`, {
      method: "POST",
      body: JSON.stringify({
        event: "submit",
        actor: {
          id: `demo-${state.role}`,
          role: state.role,
          name: roleName(state.role)
        },
        formData,
        artifacts
      })
    });
    taskDialog.close();
    await load();
    showToast("Task completed");
  } catch (error) {
    showToast(error.message);
  }
});

function renderDefinition() {
  app.innerHTML = `
    <section class="definition-layout">
      <div class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Version ${escapeHtml(state.definition.version)}</p>
            <h2>${escapeHtml(state.definition.name)}</h2>
          </div>
          <button class="primary-button" type="button" id="saveDefinitionButton">Save Definition</button>
        </div>
        <div class="panel-body">
          <textarea id="definitionEditor" class="definition-editor" spellcheck="false">${escapeHtml(JSON.stringify(state.definition, null, 2))}</textarea>
        </div>
      </div>
      <aside class="panel">
        <div class="panel-head"><h2>Tasks</h2><span class="role-pill">${state.definition.tasks.length}</span></div>
        <div class="panel-body schema-list">
          ${state.definition.tasks.slice().sort(byStageOrder).map((task) => `
            <div class="schema-row">
              <span>${escapeHtml(task.name)}</span>
              <span class="role-pill">${escapeHtml(task.stageId)}</span>
            </div>
          `).join("")}
        </div>
      </aside>
    </section>
  `;

  document.querySelector("#saveDefinitionButton").addEventListener("click", saveDefinitionFromEditor);
}

async function saveDefinitionFromEditor() {
  const editor = document.querySelector("#definitionEditor");
  try {
    const parsed = JSON.parse(editor.value);
    await api("/api/workflow-definition", {
      method: "PUT",
      body: JSON.stringify(parsed)
    });
    await load();
    showToast("Definition saved");
  } catch (error) {
    showToast(error.message);
  }
}

function renderAudit() {
  app.innerHTML = `
    <section class="panel">
      <div class="panel-head">
        <h2>Audit Trail</h2>
        <span class="role-pill">${state.audit.length}</span>
      </div>
      <div class="panel-body audit-list">
        ${state.audit.length ? state.audit.map((item) => `
          <article class="audit-item">
            <div class="card-title">
              <h3>${escapeHtml(item.message)}</h3>
              <span class="role-pill">${escapeHtml(item.type)}</span>
            </div>
            <p class="meta">${escapeHtml(formatDate(item.at))}${item.actorRole ? ` / ${escapeHtml(roleName(item.actorRole))}` : ""}</p>
          </article>
        `).join("") : `<p class="empty">No audit events yet.</p>`}
      </div>
    </section>
  `;
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    render();
  });
});

roleSelect.addEventListener("change", () => {
  state.role = roleSelect.value;
  localStorage.setItem("workflowRole", state.role);
  render();
});

refreshButton.addEventListener("click", load);
closeDialogButton.addEventListener("click", () => taskDialog.close());
cancelTaskButton.addEventListener("click", () => taskDialog.close());

load().catch((error) => {
  app.innerHTML = `<section class="notice">${escapeHtml(error.message)}</section>`;
});
