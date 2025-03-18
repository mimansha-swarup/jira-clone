import { TaskStatus } from "@/constant/root";
import { ITask } from "../root";

export interface IFiltersState {
  searchTerm: string;
  status: string;
  priority: string;
}
export interface IFiltersProps {
  filters: IFiltersState;
  handleChange: (key: string) => (value: string) => void;
}

export interface ITaskTableProps {
  filteredTasks: ITask[];
  isManager: boolean;
  onChange: (type: string, task: ITask) => () => void;
}

export interface ITimeTrackerProps {
  isOpen: boolean;
  onChange: (e: boolean) => void;
  selectedTask: ITask | null;
  updateTime: (timeSpent: number) => void;
}

export interface ITaskStatusDialogProps {
  isOpen: boolean;
  onChange: (e: boolean) => void;
  selectedTask: ITask | null;
  updateStatus: (status: TaskStatus) => void;
}
export interface IApprovalDialogProps {
  isOpen: boolean;
  onChange: (e: boolean) => void;
  selectedTask: ITask | null;
  handleTaskApproval: (e: boolean) => void;
}
