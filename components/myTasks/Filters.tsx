"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { priorityOptions, statusOptions } from "@/constant/myTasks";
import { FC } from "react";
import { IFiltersProps } from "@/types/component/filter";

const Filters: FC<IFiltersProps> = ({ filters, handleChange }) => {
  return (
    <div className="flex flex-col gap-4 pb-6 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          className="pl-8"
          value={filters.searchTerm}
          onChange={(e) => handleChange("searchTerm")(e.target.value)}
        />
      </div>

      <Select value={filters.status} onValueChange={handleChange("status")}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.priority} onValueChange={handleChange("priority")}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter priority" />
        </SelectTrigger>
        <SelectContent>
          {priorityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
