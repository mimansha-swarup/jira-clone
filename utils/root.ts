import { ITask } from "@/types/root";

export const getDailyTaskCounts = (tasks: ITask[]) => {
  console.log("tasks: ", tasks);
  const taskCounts: Record<string, number> = {};

  tasks.forEach((task) => {
    if (
      task.createdDate &&
      [
        "open",
        "in_progress",
        "review",
        "pending_approval",
        "reopened",
      ].includes(task.status.toLowerCase())
    ) {
      const createdDate = new Date(task.createdDate);
      const dateString = createdDate.toISOString().split("T")[0]; // YYYY-MM-DD

      if (taskCounts[dateString]) {
        taskCounts[dateString]++;
      } else {
        taskCounts[dateString] = 1;
      }
    }
  });

  const result = Object.entries(taskCounts).map(([date, count]) => ({
    date: date,
    count: count,
  }));

  result.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return result;
};
