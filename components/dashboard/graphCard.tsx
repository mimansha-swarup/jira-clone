import React, { FC } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "../ui/card";
import { getValue } from "@/utils/dashboard";
import { IGraphCardProps } from "@/types/component/dashboard";
import { TaskStatus } from "@/constant/root";
import { getDailyTaskCounts } from "@/utils/root";

const GraphCard: FC<IGraphCardProps> = ({
  title,
  description,
  type,
  tasks,
}) => {
  const renderChart = () => {
    switch (type) {
      case "bar": {
        const statusChartData = [
          {
            name: "Open",
            value: getValue(tasks, "status", TaskStatus.OPEN) || 0,
          },
          {
            name: "In Progress",
            value: getValue(tasks, "status", TaskStatus.IN_PROGRESS) || 0,
          },
          {
            name: "Review",
            value: getValue(tasks, "status", TaskStatus.REVIEW) || 0,
          },
          {
            name: "Pending Approval",
            value: getValue(tasks, "status", TaskStatus.PENDING_APPROVAL) || 0,
          },
          {
            name: "Closed",
            value: getValue(tasks, "status", TaskStatus.CLOSED) || 0,
          },
          {
            name: "Reopened",
            value: getValue(tasks, "status", TaskStatus.REOPENED) || 0,
          },
        ];
        console.log("statusChartData: ", statusChartData);
        return (
          <BarChart data={statusChartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Tasks" fill="#8884d8" />
          </BarChart>
        );
      }
      case "line": {
        const dailyTaskCounts = getDailyTaskCounts(tasks);
        return (
          <LineChart data={dailyTaskCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Active Tasks"
              stroke="#8884d8"
            />
          </LineChart>
        );
      }
      default:
        return <></>;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GraphCard;
