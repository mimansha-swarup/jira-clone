import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DetailForm from "@/components/create/form";

export default function EditTask() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Task</h1>

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
