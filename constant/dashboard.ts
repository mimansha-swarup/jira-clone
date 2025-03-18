import { IDashboardGraph } from "@/types/component/dashboard";
import { AlertTriangle, CheckSquare, Clock, HourglassIcon } from "lucide-react";
export const dashboardCards = [
  {
    key: "task",
    title: "Total Tasks",
    description: (isManager: boolean): string =>
      isManager ? "All tasks" : "Assigned or created by you",
    Icon: CheckSquare,
  },
  {
    key: "inProgress",
    title: "In Progress",
    description: () => "Tasks currently being worked on",
    Icon: Clock,
  },
  {
    key: "pendingApproval",
    title: "Pending Approval",
    description: (isManager: boolean): string =>
      isManager ? "Tasks awaiting approval" : "Tasks that need to be started",
    Icon: HourglassIcon,
  },
  {
    key: "criticalIssues",
    title: "Critical Issues",
    description: () => "Highest priority tasks",
    Icon: AlertTriangle,
  },
];

export const dashboardGraphs: IDashboardGraph[] = [
  {
    key: "breakdown",
    title: "Task Breakdown",
    description: "Distribution of tasks by priority and status",
    type: "bar",
  },
  {
    key: "trend",
    title: "Task Trend",
    description: "Number of concurrent tasks per day",
    type: "line",
  },
];
