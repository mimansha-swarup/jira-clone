"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { priorityOptions, statusOptions } from "@/constant/myTasks";
import { TaskPriority, TaskStatus, mockUsers } from "@/constant/root";
import { getTaskById, updateTask, createTask } from "@/utils/task";
import { ITask } from "@/types/root";
import { ITaskForm } from "../../types/component/task";

const INITIAL_FORM: ITaskForm = {
  title: "",
  description: "",
  priority: TaskPriority.MEDIUM,
  assignee: "",
  dueDate: null,
  status: TaskStatus.OPEN,
};
const DetailForm = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [formData, setFormData] = useState({
    ...INITIAL_FORM,
    assignee: user?.id || "",
  });
  const [task, setTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const taskData = getTaskById(id as string);

      if (taskData) {
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          assignee: taskData.assignee,
          status: taskData.status,
          dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        });

        // can userEdit
        if (user?.id !== taskData.assignee && user?.id !== taskData.createdBy) {
          toast("Access denied", {
            description: "You don't have permission to edit this task",
          });
          router.push("/dashboard/my-tasks");
        }
      } else {
        toast("Error", {
          description: "Task not found",
        });
        router.push("/dashboard/my-tasks");
      }

      setIsLoading(false);
    }
  }, [id]);

  const handleFormDataChange = (fieldName: string) => (value: unknown) => {
    if (["priority", "status"].includes(fieldName) && !value) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { title, description, priority, status, assignee, dueDate } =
        formData;
      if (!title.trim() || !dueDate) {
        toast("Error", {
          description: "Title and dueDate is required",
        });
        setIsSubmitting(false);
        return;
      }
      if (id && task) {
        const updatedTask: ITask = {
          ...task,
          title: title.trim(),
          description: description.trim(),
          priority,
          status,
          assignee,
          dueDate:
            typeof dueDate === "string"
              ? dueDate
              : dueDate?.toISOString() ?? undefined,
        };

        updateTask(updatedTask);

        toast("Task updated", {
          description: "Your task has been updated successfully",
        });
      } else {
        createTask({
          title: title.trim(),
          description: description.trim(),
          priority,
          status: TaskStatus.OPEN,
          createdBy: user?.id || "",
          assignee,
          createdDate: new Date().toISOString(),
          dueDate: dueDate ? dueDate.toISOString() : undefined,
        });

        toast("Task created", {
          description: "Your task has been created successfully",
        });
      }

      router.push("/dashboard/my-tasks");
    } catch (error) {
      console.log("error: ", error);
      toast("Error", {
        description: "An error occurred while creating the task",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h3>Loading task...</h3>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={(e) => handleFormDataChange("title")(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter detailed description of the task"
            rows={5}
            value={formData.description}
            onChange={(e) =>
              handleFormDataChange("description")(e.target.value)
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={handleFormDataChange("priority")}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {/* Removing All present in 0th index */}
                {priorityOptions?.slice(1).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {id && (
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={handleFormDataChange("status")}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.slice(1).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              value={formData.assignee}
              onValueChange={handleFormDataChange("assignee")}
            >
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dueDate"
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate
                    ? format(formData.dueDate, "PPP")
                    : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dueDate ?? undefined}
                  onSelect={handleFormDataChange("dueDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Saving"}
        </Button>
      </div>
    </form>
  );
};

export default DetailForm;
