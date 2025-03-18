import { TaskStatus, TaskPriority } from "./root";

export const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: TaskStatus.OPEN, label: "Open" },
  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatus.REVIEW, label: "Review" },
  { value: TaskStatus.PENDING_APPROVAL, label: "Pending Approval" },
  { value: TaskStatus.CLOSED, label: "Closed" },
  { value: TaskStatus.REOPENED, label: "Reopened" },
];

export const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: TaskPriority.LOW, label: "Low" },
  { value: TaskPriority.MEDIUM, label: "Medium" },
  { value: TaskPriority.HIGH, label: "High" },
  { value: TaskPriority.CRITICAL, label: "Critical" },
];
