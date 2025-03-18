"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Details from "@/components/taskDetail/Details";
import Info from "@/components/taskDetail/Info";
import { ITask } from "@/types/root";
import { getTaskById } from "@/utils/task";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [task, setTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const taskData = getTaskById(id as string);

      if (taskData) {
        setTask(taskData);
      } else {
        toast("Error", {
          description: "Task not found",
        });
        router.push("/dashboard");
      }

      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h3>Loading task details...</h3>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h3>Task not found</h3>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Details task={task} />

        <div className="space-y-6">
          <Info task={task} />
        </div>
      </div>
    </div>
  );
}
