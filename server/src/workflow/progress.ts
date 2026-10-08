type ProgressStage = {
    id: string;
    order: number;
};

type ProgressTaskDefinition = {
    stageId: string;
};

type ProgressDefinition = {
    stages?: ProgressStage[];
    tasks: ProgressTaskDefinition[];
};

type ProgressTask = {
    stageKey: string;
    status: string;
};

export function calculateStageProgress(
    definition: ProgressDefinition | undefined,
    processStatus: string | undefined,
    currentStageKey: string | null | undefined,
    tasks: ProgressTask[],
) {
    const stages = [...(definition?.stages ?? [])].sort((a, b) => a.order - b.order);
    const currentStageIndex = stages.findIndex((stage) => stage.id === currentStageKey);
    const currentStageTasks = definition?.tasks.filter((task) => task.stageId === currentStageKey) ?? [];
    const completedCurrentStageTasks = tasks.filter((task) =>
        task.stageKey === currentStageKey && task.status === "completed").length;
    const currentStageFraction = currentStageTasks.length
        ? Math.min(completedCurrentStageTasks / currentStageTasks.length, 1)
        : 0;
    const completedStages = processStatus === "completed"
        ? stages.length
        : Math.max(currentStageIndex, 0);
    const progress = processStatus === "completed"
        ? 100
        : stages.length && currentStageIndex >= 0
            ? Math.round(((completedStages + currentStageFraction) / stages.length) * 100)
            : 0;

    return {
        completedStages,
        totalStages: stages.length,
        progress,
    };
}
