import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";
import { formatTimeSpent, getUserName } from "@/utils/dashboard/myTasks";
import { FC } from "react";
import { IApprovalDialogProps } from "@/types/component/filter";
const ApprovalDialog: FC<IApprovalDialogProps> = ({
  isOpen,
  onChange,
  selectedTask,
  handleTaskApproval,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Approval</DialogTitle>
          <DialogDescription>
            Review the task &quot;{selectedTask?.title}&quot; for completion.
          </DialogDescription>
        </DialogHeader>

        {selectedTask && (
          <div className="grid gap-4 py-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedTask.description}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Time Spent</h3>
              <p className="text-sm mt-1">
                {formatTimeSpent(selectedTask.timeSpent)}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Assignee</h3>
              <p className="text-sm mt-1">
                {getUserName(selectedTask.assignee)}
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm">
                The developer has marked this task as complete. Do you approve
                the closure?
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleTaskApproval(false)}
            className="flex-1 sm:flex-none"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject & Reopen
          </Button>
          <Button
            onClick={() => handleTaskApproval(true)}
            className="flex-1 sm:flex-none"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approve & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalDialog;
