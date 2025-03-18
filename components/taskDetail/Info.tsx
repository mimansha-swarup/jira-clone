import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { getUserName } from "@/utils/dashboard/myTasks";
import { ITask } from "@/types/root";
import { getPriorityInfo, getStatusInfo } from "@/utils/task";

const Info = ({ task }: { task: ITask }) => {
  const priorityInfo = getPriorityInfo(task.priority);
  const statusInfo = getStatusInfo(task.status);
  const StatusIcon = statusInfo.icon;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className={`font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${priorityInfo.color}`} />
          <div>
            <p className="text-sm text-muted-foreground">Priority</p>
            <p className={`font-medium ${priorityInfo.color}`}>
              {priorityInfo.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Created On</p>
            <p className="font-medium">
              {format(new Date(task.createdDate), "PPP")}
            </p>
          </div>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">
                {format(new Date(task.dueDate), "PPP")}
              </p>
            </div>
          </div>
        )}

        <Separator />

        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Created By</p>
            <p className="font-medium">{getUserName(task.createdBy)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Assigned To</p>
            <p className="font-medium">{getUserName(task.assignee)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Info;
