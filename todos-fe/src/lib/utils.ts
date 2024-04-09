import { todoStatus } from "@/constants";
import { props, todo } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showToast(title: string, description: string) {
  toast(title, {
    description: description,
  });
}

export const clearTodoStates = (props: props) => {
  props.setTitle("");
  props.setDescription("");
  props.setDeadLine(new Date());
  props.setStatus(todoStatus.todo);
  props.setSelectedTodoID("");
};

export const setSelectedTodo = (todo: todo, props: props) => {
  props.setTitle(todo.title);
  props.setDescription(todo.description);
  props.setDeadLine(todo.deadLine);
  props.setStatus(todo.status);
  props.setSelectedTodoID(todo.rowguid);
};
