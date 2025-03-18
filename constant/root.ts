import { ITask, IUser } from "@/types/root";

export enum UserRole {
  DEVELOPER = "developer",
  MANAGER = "manager",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  PENDING_APPROVAL = "pending_approval",
  CLOSED = "closed",
  REOPENED = "reopened",
}

export const mockUsersWithCredentials: IUser[] = [
  {
    id: "1",
    name: "John Developer",
    email: "dev@example.com",
    password: "dev123",
    role: UserRole.DEVELOPER,
  },
  {
    id: "2",
    name: "Jane Developer",
    email: "jane@example.com",
    password: "dev123",
    role: UserRole.DEVELOPER,
  },
  {
    id: "3",
    name: "Mark Manager",
    email: "manager@example.com",
    password: "manager123",
    role: UserRole.MANAGER,
  },
];

export const mockUsers = mockUsersWithCredentials.map((user) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
});

export const mockTasks: ITask[] = [
  {
    id: "1",
    title: "Fix login page responsiveness",
    description:
      "The login page breaks on mobile devices. Need to make it responsive.",
    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdBy: "1",
    assignee: "1",
    createdDate: "2025-03-10T09:00:00Z",
    dueDate: "2025-03-15T17:00:00Z",
    timeSpent: 120,
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add JWT authentication to the API endpoints.",
    priority: TaskPriority.CRITICAL,
    status: TaskStatus.OPEN,
    createdBy: "3",
    assignee: "2",
    createdDate: "2025-03-11T10:30:00Z",
    dueDate: "2025-03-20T17:00:00Z",
    timeSpent: 0,
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update the API documentation with the new endpoints.",
    priority: TaskPriority.LOW,
    status: TaskStatus.PENDING_APPROVAL,
    createdBy: "2",
    assignee: "2",
    createdDate: "2025-03-08T11:00:00Z",
    dueDate: "2025-03-14T17:00:00Z",
    timeSpent: 180,
  },
  {
    id: "4",
    title: "Performance optimization",
    description: "Optimize database queries on the dashboard page.",
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.REVIEW,
    createdBy: "1",
    assignee: "1",
    createdDate: "2025-03-09T09:30:00Z",
    dueDate: "2025-03-16T17:00:00Z",
    timeSpent: 240,
  },
  {
    id: "5",
    title: "Fix search functionality",
    description:
      "The search feature is not working correctly on the products page.",
    priority: TaskPriority.HIGH,
    status: TaskStatus.CLOSED,
    createdBy: "2",
    assignee: "2",
    createdDate: "2025-03-07T10:00:00Z",
    dueDate: "2025-03-12T17:00:00Z",
    timeSpent: 360,
  },
  {
    id: "6",
    title: "Add export to CSV feature",
    description:
      "Users should be able to export their task list to a CSV file.",
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.REOPENED,
    createdBy: "3",
    assignee: "1",
    createdDate: "2025-03-06T11:30:00Z",
    dueDate: "2025-03-14T17:00:00Z",
    timeSpent: 300,
  },
  {
    id: "7",
    title: "Enhance dashboard UI",
    description:
      "Improve the dashboard user interface for a better experience.",
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.OPEN,
    createdBy: "1",
    assignee: "3",
    createdDate: "2025-03-05T13:45:00Z",
    dueDate: "2025-03-18T17:00:00Z",
    timeSpent: 90,
  },
  {
    id: "8",
    title: "Implement dark mode",
    description: "Allow users to switch between light and dark themes.",
    priority: TaskPriority.LOW,
    status: TaskStatus.IN_PROGRESS,
    createdBy: "2",
    assignee: "1",
    createdDate: "2025-03-04T12:20:00Z",
    dueDate: "2025-03-20T17:00:00Z",
    timeSpent: 150,
  },
  {
    id: "9",
    title: "Fix email notification bug",
    description: "Emails are not being sent correctly when tasks are updated.",
    priority: TaskPriority.HIGH,
    status: TaskStatus.REVIEW,
    createdBy: "3",
    assignee: "2",
    createdDate: "2025-03-03T14:15:00Z",
    dueDate: "2025-03-10T17:00:00Z",
    timeSpent: 210,
  },
  {
    id: "10",
    title: "Add role-based access control",
    description: "Restrict certain features based on user roles.",
    priority: TaskPriority.CRITICAL,
    status: TaskStatus.IN_PROGRESS,
    createdBy: "1",
    assignee: "2",
    createdDate: "2025-03-02T09:00:00Z",
    dueDate: "2025-03-15T17:00:00Z",
    timeSpent: 300,
  },
];
