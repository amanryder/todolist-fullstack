import { CircleCheckBig, CircleDashed, CircleDot } from "lucide-react";

export const todoStatus = {
  todo: "TODO",
  inProgress: "IN_PROGRESS",
  completed: "COMPLETED",
};

export const statuses = [
  {
    value: todoStatus.todo,
    label: "Todo",
    icon: CircleDashed,
  },
  {
    value: todoStatus.inProgress,
    label: "In progress",
    icon: CircleDot,
  },
  {
    value: todoStatus.completed,
    label: "Completed",
    icon: CircleCheckBig,
  },
];
