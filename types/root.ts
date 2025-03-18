import { UserRole, TaskPriority, TaskStatus } from "@/constant/root";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdBy: string;
  assignee: string;
  createdDate: string;
  dueDate?: string;
  timeSpent: number; // in minutes;
}

export interface ITimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  description?: string;
}
