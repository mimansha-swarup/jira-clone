"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useFilteredTasks from "@/hooks/useFilteredTasks";
import Filters from "@/components/myTasks/Filters";
import TaskTable from "@/components/myTasks/TaskTable";
import TimeTracker from "@/components/myTasks/TimeTracker";
import UpdateStatus from "@/components/myTasks/UpdateStatus";
import ApprovalDialog from "../allTasks/ApprovalDialog";
import { UserRole, TaskStatus } from "@/constant/root";
import { ITask } from "@/types/root";
import { getAllTasks, updateTask, deleteTask } from "@/utils/task";

export default function TaskTableView() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const isManager = user?.role === UserRole.MANAGER;

  const [modal, setModal] = useState({
    delete: false,
    timeTracking: false,
    taskStatus: false,
    approval: false,
  });

  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "all",
    priority: "all",
  });

  const filteredTasks = useFilteredTasks(tasks, filters);

  const handleModalChange = (modalName: string) => (value: boolean) => {
    setModal((prev) => ({ ...prev, [modalName]: value }));
  };

  const handleFilterChange = (fieldName: string) => (value: string) => {
    setFilters((prev) => ({ ...prev, [fieldName]: value }));
  };

  useEffect(() => {
    const allTasks = getAllTasks();
    if (isManager) {
      setTasks(allTasks);
    } else if (user) {
      const userTasks = allTasks.filter((task) => task.assignee === user.id);
      setTasks(userTasks);
    }
  }, [user]);

  const handleDropdownSelect = (type: string, task: ITask) => () => {
    setSelectedTask(task);
    handleModalChange(type)(true);
  };

  const updateCommon = (updatedTask: ITask, modalType: string) => {
    updateTask(updatedTask);
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

    handleModalChange(modalType)(false);
  };

  const updateTaskStatus = (status: TaskStatus) => {
    if (!selectedTask) return;

    const updatedTask = { ...selectedTask, status };
    updateCommon(updatedTask, "taskStatus");

    toast("Task status updated", {
      description: `Task status changed to ${status}`,
    });
  };
  const updateTimeSpent = (timeSpent: number) => {
    if (!selectedTask) return;

    const updatedTask: ITask = { ...selectedTask, timeSpent };
    updateCommon(updatedTask, "timeTracking");

    toast("Task Time Tracked");
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    deleteTask(selectedTask.id);
    setTasks(tasks.filter((task) => task.id !== selectedTask.id));
    handleModalChange("delete")(false);

    toast("Task deleted", {
      description: "The task has been permanently deleted",
    });
  };

  const handleTaskApproval = (approved: boolean) => {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      status: approved ? TaskStatus.CLOSED : TaskStatus.REOPENED,
    };

    updateCommon(updatedTask, "approval");

    toast(approved ? "Task approved" : "Task reopened", {
      description: approved
        ? "The task has been approved and closed"
        : "The task has been reopened and sent back to the developer",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isManager ? "All" : "My"} Tasks
          </h1>
          {!isManager && (
            <Button onClick={() => router.push("/dashboard/create")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          )}
        </div>
        <Filters filters={filters} handleChange={handleFilterChange} />

        <Card>
          <CardHeader className="space-y-0 pb-3">
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <TaskTable
                filteredTasks={filteredTasks}
                onChange={handleDropdownSelect}
                isManager={isManager}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <TimeTracker
        isOpen={modal.timeTracking}
        onChange={handleModalChange("timeTracking")}
        selectedTask={selectedTask}
        updateTime={updateTimeSpent}
      />

      <UpdateStatus
        isOpen={modal.taskStatus}
        onChange={handleModalChange("taskStatus")}
        updateStatus={updateTaskStatus}
        selectedTask={selectedTask}
      />
      {isManager && (
        <ApprovalDialog
          isOpen={modal.approval}
          onChange={handleModalChange("approval")}
          selectedTask={selectedTask}
          handleTaskApproval={handleTaskApproval}
        />
      )}

      <AlertDialog
        open={modal.delete}
        onOpenChange={handleModalChange("delete")}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the task &quot;{selectedTask?.title}
              &quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTask}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
