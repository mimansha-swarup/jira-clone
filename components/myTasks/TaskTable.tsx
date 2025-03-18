import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  MoreVertical,
  Clock,
  CheckCircle2,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import { format } from "date-fns";

import {
  getPriorityColor,
  getStatusColor,
  formatTimeSpent,
  getUserName,
} from "@/utils/dashboard/myTasks";
import { FC } from "react";
import { ITaskTableProps } from "@/types/component/filter";
import { useRouter } from "next/navigation";
import { TaskStatus } from "@/constant/root";

const TaskTable: FC<ITaskTableProps> = ({
  filteredTasks,
  onChange,
  isManager,
}) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Priority</TableHead>
          <TableHead>Status</TableHead>
          {isManager && <TableHead>Assignee</TableHead>}
          <TableHead className="hidden md:table-cell">Due Date</TableHead>
          <TableHead>Time Spent</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTasks.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No tasks found. Create a new task to get started.
            </TableCell>
          </TableRow>
        ) : (
          filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold text-nowrap ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </TableCell>
              {isManager && (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{getUserName(task.assignee)}</span>
                  </div>
                </TableCell>
              )}
              <TableCell className="hidden md:table-cell">
                {task.dueDate
                  ? format(new Date(task.dueDate), "MMM d, yyyy")
                  : "No due date"}
              </TableCell>
              <TableCell className="text-nowrap">
                {formatTimeSpent(task.timeSpent)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isManager && (
                      <DropdownMenuItem
                        onClick={onChange("timeTracking", task)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Track Time
                      </DropdownMenuItem>
                    )}
                    {!isManager && (
                      <DropdownMenuItem onClick={onChange("taskStatus", task)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Update Status
                      </DropdownMenuItem>
                    )}
                    {!isManager && (
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/edit-task/${task.id}`)
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Task
                      </DropdownMenuItem>
                    )}
                    {!isManager && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={onChange("delete", task)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Task
                      </DropdownMenuItem>
                    )}
                    {isManager && (
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/task-details/${task.id}`)
                        }
                      >
                        View Details
                      </DropdownMenuItem>
                    )}
                    {isManager &&
                      task.status === TaskStatus.PENDING_APPROVAL && (
                        <DropdownMenuItem onClick={onChange("approval", task)}>
                          Approve/Reject
                        </DropdownMenuItem>
                      )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
