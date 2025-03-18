import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DetailForm from "@/components/create/form";

export default function CreateTask() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Create New Task</h1>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailForm />
        </CardContent>
      </Card>
    </div>
  );
}
