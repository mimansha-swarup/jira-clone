import { TaskStatus, TaskPriority, mockUsers } from "@/constant/root";
import { ITask } from "@/types/root";

// Filter related helper functions
export const filterTasksBySearch = (tasks: ITask[], searchTerm: string) => {
  if (!searchTerm) return tasks;
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterTasksByStatus = (tasks: ITask[], statusFilter: string) => {
  if (statusFilter === "all") return tasks;
  return tasks.filter((task) => task.status === statusFilter);
};

export const filterTasksByPriority = (
  tasks: ITask[],
  priorityFilter: string
) => {
  if (priorityFilter === "all") return tasks;
  return tasks.filter((task) => task.priority === priorityFilter);
};

// color related helpers
export const getStatusColor = (status: TaskStatus) => {
  console.log("status: ", status);
  switch (status) {
    case TaskStatus.OPEN:
      return "bg-blue-100 text-blue-800";
    case TaskStatus.IN_PROGRESS:
      return "bg-yellow-100 text-yellow-800";
    case TaskStatus.REVIEW:
      return "bg-purple-100 text-purple-800";
    case TaskStatus.PENDING_APPROVAL:
      return "bg-orange-100 text-orange-800";
    case TaskStatus.CLOSED:
      return "bg-green-100 text-green-800";
    case TaskStatus.REOPENED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.LOW:
      return "bg-blue-100 text-blue-800";
    case TaskPriority.MEDIUM:
      return "bg-yellow-100 text-yellow-800";
    case TaskPriority.HIGH:
      return "bg-orange-100 text-orange-800";
    case TaskPriority.CRITICAL:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatTimeSpent = (minutes: number) => {
  const [hours, mins] = minuteToHours(minutes);
  return `${hours}h ${mins}m`;
};
export const minuteToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return [hours, mins];
};

export const getUserName = (userId: string) => {
  const user = mockUsers.find((u) => u.id === userId);
  return user ? user.name : "Unknown";
};
