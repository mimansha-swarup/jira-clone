import React, { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { IDashboardCardProps } from "@/types/component/dashboard";

const DashboardCard: FC<IDashboardCardProps> = ({
  title,
  isManager,
  value,
  Icon,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {isManager ? "All tasks" : "Assigned to you"}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
