import { IFiltersState } from "@/types/component/filter";
import { ITask } from "@/types/root";
import {
  filterTasksBySearch,
  filterTasksByStatus,
  filterTasksByPriority,
} from "@/utils/dashboard/myTasks";
import { useState, useEffect } from "react";

const useFilteredTasks = (tasks: ITask[], filters: IFiltersState) => {
  const {
    searchTerm,
    status: statusFilter,
    priority: priorityFilter,
  } = filters;
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  useEffect(() => {
    let result = [...tasks];

    result = filterTasksBySearch(result, searchTerm);
    result = filterTasksByStatus(result, statusFilter);
    result = filterTasksByPriority(result, priorityFilter);

    setFilteredTasks(result);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return filteredTasks;
};

export default useFilteredTasks;
