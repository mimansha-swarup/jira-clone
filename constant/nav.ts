import {
  CheckSquare,
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Tasks",
    href: "/dashboard/my-tasks",
    icon: CheckSquare,
    hideForManager: true,
  },
  {
    name: "All Tasks",
    href: "/dashboard/all-tasks",
    icon: ClipboardList,
    showForManagerOnly: true,
  },
  {
    name: "Create Task",
    href: "/dashboard/create",
    icon: PlusCircle,
  },
];
