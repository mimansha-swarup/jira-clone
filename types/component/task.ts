import { TaskPriority, TaskStatus } from "@/constant/root";

export interface ITaskForm {
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: Date | null;
  status: TaskStatus;
}
