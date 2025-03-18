import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { statusOptions } from "@/constant/myTasks";
import { FC } from "react";
import { ITaskStatusDialogProps } from "@/types/component/filter";
import { TaskStatus } from "../../constant/root";

const UpdateStatus: FC<ITaskStatusDialogProps> = ({
  isOpen,
  onChange,
  updateStatus,
  selectedTask,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task Status</DialogTitle>
          <DialogDescription>
            Change the status of &quot;{selectedTask?.title}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {statusOptions?.slice(1).map((button) => (
              <Button
                key={button.value}
                variant="outline"
                onClick={() => updateStatus(button.value as TaskStatus)}
                className={
                  selectedTask?.status === button.value ? "border-primary" : ""
                }
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatus;
