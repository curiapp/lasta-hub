const terminalTask = "END";

function now() {
  return new Date().toISOString();
}

function newId(prefix) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

function taskById(definition, taskDefinitionId) {
  const task = definition.tasks.find((item) => item.id === taskDefinitionId);
  if (!task) throw Object.assign(new Error(`Unknown task definition: ${taskDefinitionId}`), { status: 400 });
  return task;
}

function stageById(definition, stageId) {
  return definition.stages.find((stage) => stage.id === stageId);
}

function addAudit(db, event) {
  const record = {
    id: newId("audit"),
    at: now(),
    ...event
  };
  db.audit.unshift(record);
  return record;
}

function canAct(taskDefinition, actor) {
  if (!actor?.role) return false;
  return actor.role === "admin" || taskDefinition.ownerRoles.includes(actor.role);
}

function validateForm(taskDefinition, formData = {}) {
  const missing = [];
  for (const field of taskDefinition.form ?? []) {
    if (field.required && !String(formData[field.key] ?? "").trim()) {
      missing.push(field.label);
    }
  }
  return missing;
}

function validateArtifacts(taskDefinition, artifacts = []) {
  const missing = [];
  for (const required of taskDefinition.artifacts ?? []) {
    if (!required.required) continue;
    const hasArtifact = artifacts.some((artifact) => artifact.type === required.key);
    if (!hasArtifact) missing.push(required.label);
  }
  return missing;
}

function matchesWhen(when, formData) {
  if (!when) return true;
  if (Object.hasOwn(when, "equals")) return formData?.[when.field] === when.equals;
  if (Object.hasOwn(when, "notEquals")) return formData?.[when.field] !== when.notEquals;
  if (Array.isArray(when.in)) return when.in.includes(formData?.[when.field]);
  return false;
}

function selectTransition(taskDefinition, payload) {
  const transitions = taskDefinition.transitions ?? [];
  const event = payload.event ?? "submit";
  return transitions.find((transition) => transition.event === event && matchesWhen(transition.when, payload.formData));
}

function createTaskInstance(db, definition, process, taskDefinitionId, causedByTaskId) {
  const taskDefinition = taskById(definition, taskDefinitionId);
  const existing = db.tasks.find((task) => {
    return task.processId === process.id && task.definitionId === taskDefinitionId && task.status === "active";
  });

  if (existing) return existing;

  const stage = stageById(definition, taskDefinition.stageId);
  const task = {
    id: newId("task"),
    processId: process.id,
    programmeId: process.programmeId,
    definitionId: taskDefinition.id,
    name: taskDefinition.name,
    stageId: taskDefinition.stageId,
    stageName: stage?.name ?? taskDefinition.stageId,
    ownerRoles: taskDefinition.ownerRoles,
    status: "active",
    createdAt: now(),
    completedAt: null,
    causedByTaskId,
    formData: null
  };
  db.tasks.unshift(task);
  addAudit(db, {
    type: "task.created",
    programmeId: process.programmeId,
    processId: process.id,
    taskId: task.id,
    taskDefinitionId,
    message: `${taskDefinition.name} created`
  });
  return task;
}

export function getDashboard(definition, db) {
  const activeTasks = db.tasks.filter((task) => task.status === "active");
  const completedTasks = db.tasks.filter((task) => task.status === "completed");
  const processCounts = db.processes.reduce((acc, process) => {
    acc[process.status] = (acc[process.status] ?? 0) + 1;
    return acc;
  }, {});

  return {
    programmeCount: db.programmes.length,
    activeTaskCount: activeTasks.length,
    completedTaskCount: completedTasks.length,
    processCounts,
    stageCount: definition.stages?.length ?? 0,
    taskDefinitionCount: definition.tasks?.length ?? 0
  };
}

export function createProgramme(definition, db, input) {
  const required = ["title", "code", "faculty", "department", "level"];
  const missing = required.filter((key) => !String(input[key] ?? "").trim());
  if (missing.length > 0) {
    throw Object.assign(new Error(`Missing programme fields: ${missing.join(", ")}`), { status: 400 });
  }

  const programme = {
    id: newId("programme"),
    title: input.title,
    code: input.code,
    faculty: input.faculty,
    department: input.department,
    level: input.level,
    status: "in_progress",
    createdAt: now(),
    updatedAt: now()
  };

  const process = {
    id: newId("process"),
    programmeId: programme.id,
    definitionId: definition.id,
    definitionVersion: definition.version,
    status: "running",
    currentStageId: null,
    startedAt: now(),
    completedAt: null
  };

  db.programmes.unshift(programme);
  db.processes.unshift(process);

  const firstTask = createTaskInstance(db, definition, process, definition.initialTask, null);
  process.currentStageId = firstTask.stageId;

  addAudit(db, {
    type: "process.started",
    programmeId: programme.id,
    processId: process.id,
    message: `${programme.title} started`
  });

  return { programme, process, firstTask };
}

export function completeTask(definition, db, taskId, payload) {
  const task = db.tasks.find((item) => item.id === taskId);
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  if (task.status !== "active") throw Object.assign(new Error("Task is not active"), { status: 409 });

  const process = db.processes.find((item) => item.id === task.processId);
  if (!process) throw Object.assign(new Error("Process not found"), { status: 404 });
  if (process.status !== "running") throw Object.assign(new Error("Process is not running"), { status: 409 });

  const programme = db.programmes.find((item) => item.id === task.programmeId);
  if (!programme) throw Object.assign(new Error("Programme not found"), { status: 404 });

  const taskDefinition = taskById(definition, task.definitionId);
  const actor = payload.actor ?? {};

  if (!canAct(taskDefinition, actor)) {
    throw Object.assign(new Error(`Role ${actor.role ?? "unknown"} cannot complete ${taskDefinition.name}`), { status: 403 });
  }

  const missingFields = validateForm(taskDefinition, payload.formData);
  const missingArtifacts = validateArtifacts(taskDefinition, payload.artifacts);
  const missing = [...missingFields, ...missingArtifacts];
  if (missing.length > 0) {
    throw Object.assign(new Error(`Missing required items: ${missing.join(", ")}`), { status: 400 });
  }

  const transition = selectTransition(taskDefinition, payload);
  if (!transition) {
    throw Object.assign(new Error("No transition matched this submission"), { status: 400 });
  }

  task.status = "completed";
  task.completedAt = now();
  task.completedBy = actor;
  task.formData = payload.formData ?? {};
  task.decision = payload.formData?.decision ?? null;
  task.transitionLabel = transition.label;

  const artifacts = (payload.artifacts ?? []).map((artifact) => {
    const record = {
      id: newId("artifact"),
      programmeId: task.programmeId,
      processId: task.processId,
      taskId: task.id,
      taskDefinitionId: task.definitionId,
      type: artifact.type,
      title: artifact.title || artifact.type,
      reference: artifact.reference || "",
      createdAt: now(),
      createdBy: actor
    };
    db.artifacts.unshift(record);
    return record;
  });

  addAudit(db, {
    type: "task.completed",
    programmeId: task.programmeId,
    processId: task.processId,
    taskId: task.id,
    taskDefinitionId: task.definitionId,
    actorRole: actor.role,
    message: `${taskDefinition.name} completed`
  });

  let createdTasks = [];
  if (transition.to === terminalTask) {
    process.status = transition.outcome ?? "completed";
    process.completedAt = now();
    process.currentStageId = null;
    programme.status = process.status;
    programme.updatedAt = now();

    addAudit(db, {
      type: "process.finished",
      programmeId: task.programmeId,
      processId: task.processId,
      outcome: process.status,
      message: `Process ${process.status}`
    });
  } else {
    const nextDefinitions = Array.isArray(transition.to) ? transition.to : [transition.to];
    createdTasks = nextDefinitions.map((nextDefinitionId) => {
      return createTaskInstance(db, definition, process, nextDefinitionId, task.id);
    });

    process.currentStageId = createdTasks[0]?.stageId ?? process.currentStageId;
    programme.updatedAt = now();
  }

  const notifications = (transition.notifyRoles ?? []).map((role) => ({
    id: newId("notification"),
    role,
    programmeId: task.programmeId,
    taskIds: createdTasks.map((createdTask) => createdTask.id),
    title: transition.label,
    createdAt: now()
  }));

  return {
    task,
    artifacts,
    transition,
    createdTasks,
    notifications,
    process,
    programme
  };
}

export function shapeProgramme(definition, db, programmeId) {
  const programme = db.programmes.find((item) => item.id === programmeId);
  if (!programme) return null;
  const process = db.processes.find((item) => item.programmeId === programme.id);
  const tasks = db.tasks.filter((task) => task.programmeId === programme.id);
  const artifacts = db.artifacts.filter((artifact) => artifact.programmeId === programme.id);
  const audit = db.audit.filter((item) => item.programmeId === programme.id);

  return {
    programme,
    process,
    tasks: tasks.map((task) => ({
      ...task,
      definition: definition.tasks.find((item) => item.id === task.definitionId)
    })),
    artifacts,
    audit
  };
}
