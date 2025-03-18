import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ITask } from "../root";

export interface IDashboardCardProps {
  title: string;
  description: string;
  value: number;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export interface IGraphCardProps {
  title: string;
  description: string;
  type: "bar" | "line";
  tasks: ITask[];
}

export interface IGraphCardProps {
  title: string;
  description: string;
  type: "bar" | "line";
  tasks: ITask[];
}

export interface IDashboardGraph extends Omit<IGraphCardProps, "tasks"> {
  key: string;
}
