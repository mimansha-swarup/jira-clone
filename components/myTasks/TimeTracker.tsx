import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITimeTrackerProps } from "@/types/component/filter";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { minuteToHours } from "@/utils/dashboard/myTasks";
import { toast } from "sonner";

const INITIAL_TIME = {
  hour: "0",
  minutes: "0",
};
const TimeTracker: FC<ITimeTrackerProps> = ({
  isOpen,
  onChange,
  selectedTask,
  updateTime,
}) => {
  const [time, setTime] = useState(INITIAL_TIME);
  useEffect(() => {
    if (Number.isInteger(selectedTask?.timeSpent)) {
      const [hour, min] = minuteToHours(selectedTask?.timeSpent ?? 0);
      setTime({
        hour: hour?.toString(),
        minutes: min?.toString(),
      });
    }
  }, []);

  const handleTimeChange =
    (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setTime((prev) => ({
        ...prev,
        [fieldName]: e.target.value,
      }));
    };

  const trackTime = () => {
    const { hour, minutes } = time;
    const numHour = parseInt(hour, 10);
    const numMinutes = parseInt(minutes, 10);

    if (isNaN(numHour) || isNaN(numMinutes)) {
      toast("Hour or minute is not a valid number");
      return null;
    }

    const timeSpent = numHour * 60 + numMinutes;

    updateTime(timeSpent);
    setTime(INITIAL_TIME);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track Time for {selectedTask?.title}</DialogTitle>
          <DialogDescription>Log time spent on this task.</DialogDescription>
        </DialogHeader>

        <div className="space-x-4 py-4 flex">
          <div className="space-y-2">
            <Label htmlFor="hour">Hours</Label>
            <Input
              id="timeDescription"
              placeholder="Hours Taken"
              value={time.hour}
              type="number"
              onChange={handleTimeChange("hour")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hour">Minutes</Label>
            <Input
              type="number"
              id="timeDescription"
              placeholder="Minutes taken"
              value={time.minutes}
              onChange={handleTimeChange("minutes")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onChange(false)}>
            Cancel
          </Button>
          <Button onClick={trackTime}>Track </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeTracker;
