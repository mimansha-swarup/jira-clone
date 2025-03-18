"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";

import { dashboardCards, dashboardGraphs } from "@/constant/dashboard";
import DashboardCard from "@/components/dashboard/card";
import { getValue } from "@/utils/dashboard";
import GraphCard from "@/components/dashboard/graphCard";
import { UserRole, TaskStatus, TaskPriority } from "@/constant/root";
import { getAllTasks } from "@/utils/task";
import { ITask } from "@/types/root";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const isManager = user?.role === UserRole.MANAGER;

  useEffect(() => {
    setTasks(getAllTasks() ?? []);
  }, []);

  const userTasks = isManager
    ? tasks
    : tasks.filter(
        (task) => task.assignee === user?.id || task.createdBy === user?.id
      );

  const cardValue: Record<string, number> = {
    task: userTasks.length,
    inProgress: getValue(userTasks, "status", TaskStatus.IN_PROGRESS),
    pendingApproval: isManager
      ? getValue(tasks, "status", TaskStatus.PENDING_APPROVAL)
      : getValue(userTasks, "status", TaskStatus.OPEN),
    criticalIssues: getValue(userTasks, "priority", TaskPriority.CRITICAL),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.key}
            title={card.title}
            isManager={isManager}
            value={cardValue[card.key]}
            Icon={card.Icon}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {dashboardGraphs.map((graph) => (
          <GraphCard
            key={graph.key}
            title={graph.title}
            description={graph.description}
            type={graph.type}
            tasks={isManager ? tasks : userTasks}
          />
        ))}
      </div>
    </div>
  );
}
