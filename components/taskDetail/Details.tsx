import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ITask } from "@/types/root";

import { formatTimeSpent } from "@/utils/dashboard/myTasks";

const Details = ({ task }: { task: ITask }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Task Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {task.description || "No description provided."}
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Time Tracking</h3>

          <div className="rounded-md border p-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">
                  Total Time Spent
                </span>
                <p className="text-2xl font-bold">
                  {formatTimeSpent(task.timeSpent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Details;
