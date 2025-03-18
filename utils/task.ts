import { mockTasks } from "@/constant/root";
import { ITask } from "@/types/root";
import {
  FileText,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const initializeTaskStorage = () => {
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) {
      localStorage.setItem("tasks", JSON.stringify(mockTasks));
    }
  }
};

// Get all tasks
export const getAllTasks = (): ITask[] => {
  initializeTaskStorage();
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};

// Get task by ID
export const getTaskById = (id: string): ITask | undefined => {
  const tasks = getAllTasks();
  return tasks.find((task) => task.id === id);
};

// Create a new task
export const createTask = (
  task: Omit<ITask, "id" | "timeSpent" | "timeEntries">
): ITask => {
  const tasks = getAllTasks();
  const newTask: ITask = {
    ...task,
    id: crypto.randomUUID(),
    timeSpent: 0,
  };
  localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  return newTask;
};

export const updateTask = (updatedTask: ITask): ITask => {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  tasks[taskIndex] = updatedTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return updatedTask;
};

export const deleteTask = (id: string): void => {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
};

export const getPriorityInfo = (priority: string) => {
  switch (priority) {
    case "low":
      return { label: "Low", color: "text-blue-500" };
    case "medium":
      return { label: "Medium", color: "text-yellow-500" };
    case "high":
      return { label: "High", color: "text-orange-500" };
    case "critical":
      return { label: "Critical", color: "text-red-500" };
    default:
      return { label: priority, color: "text-gray-500" };
  }
};
export const getStatusInfo = (status: string) => {
  switch (status) {
    case "open":
      return { label: "Open", color: "text-blue-500", icon: FileText };
    case "in_progress":
      return { label: "In Progress", color: "text-yellow-500", icon: Clock };
    case "review":
      return { label: "Review", color: "text-purple-500", icon: User };
    case "pending_approval":
      return {
        label: "Pending Approval",
        color: "text-orange-500",
        icon: AlertTriangle,
      };
    case "closed":
      return { label: "Closed", color: "text-green-500", icon: CheckCircle2 };
    case "reopened":
      return {
        label: "Reopened",
        color: "text-red-500",
        icon: AlertTriangle,
      };
    default:
      return { label: status, color: "text-gray-500", icon: FileText };
  }
};
