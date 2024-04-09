import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { todo } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import DeleteDialog from "./components/delete-dialog";
import CreateDialog from "./components/create-dialog";
import EditDialog from "./components/edit-dialog";
import AvatarMenu from "./components/avatar-menu";
import { Calendar, Search } from "lucide-react";
import { statuses, todoStatus } from "./constants";
import { Toaster } from "sonner";
import { clearTodoStates, setSelectedTodo, showToast } from "./lib/utils";
import { addTodo, deleteToDo, editTodo, fetchTodos } from "./api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

function Todos() {
  const { getAccessTokenSilently, logout, user } = useAuth0();
  const queryclient = useQueryClient();
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadLine, setDeadLine] = useState(new Date());
  const [status, setStatus] = useState(todoStatus.todo);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTodoId, setSelectedTodoID] = useState("");

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      console.log(token);

      return setToken(token);
    })();
  }, []);

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchTodos(token, search),
    queryKey: ["todos", { search }],
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: () => {
      return addTodo(token, title, description, status, deadLine);
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: (uuid: string) => {
      return deleteToDo(token, uuid);
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutateAsync: editTodoMutation } = useMutation({
    mutationFn: () => {
      return editTodo(
        token,
        title,
        description,
        status,
        deadLine,
        selectedTodoId
      );
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = async () => {
    await addTodoMutation();
    showToast("Success", "Task added successfully");
    clearTodoStates(props);
  };

  const handleEdit = async () => {
    await editTodoMutation();
    showToast("Success", "Task edited successfully");
    clearTodoStates(props);
  };

  const handleDelete = async (uuid: string) => {
    await deleteTodoMutation(uuid);
    showToast("Success", "Task deleted successfully");
  };

  const props = {
    title,
    setTitle,
    description,
    setDescription,
    deadLine,
    setDeadLine,
    status,
    setStatus,
    handleSubmit,
    handleEdit,
    setSelectedTodoID,
  };

  return (
    <>
      <div className=" flex justify-center px-5">
        <Card className="w-[700px] my-20 p-5">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Todos</CardTitle>
                <CardDescription>Manage your tasks</CardDescription>
              </div>
              <div className="flex flex-row items-center gap-1">
                <h3 className="mr-3 text-lg font-normal">
                  Hi, {user?.nickname}
                </h3>
                <AvatarMenu user={user} logout={logout} />
              </div>
            </div>
            <div className="flex flex-row gap-8 justify-between">
              <div
                onClick={() =>
                  selectedTodoId !== "" ? clearTodoStates(props) : null
                }
              >
                <CreateDialog props={props} />
              </div>
              <div className="flex flex-row gap-1">
                <Input
                  type="text"
                  value={keyword}
                  placeholder="search"
                  className="focus-visible:ring-1 focus-visible:ring-offset-1"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                  className="max-w-[50px] flex justify-center items-center"
                  onClick={() => setSearch(keyword)}
                >
                  <Search className="" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center mt-10">
                Loading ...
              </div>
            ) : error ? (
              <div className="flex justify-center items-center mt-10">
                Error! Can't reach API. ,{" "}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todos?.data.map((todo: todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="flex flex-row justify-between border-2 p-3 rounded-xl"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-xl font-semibold">{todo.title}</h3>
                        <p className="text-sm">
                          {todo.description.substring(0, 40)}
                        </p>
                        <div className="flex flex-row items-center mt-5">
                          <Calendar className="h-4 w-5" />
                          <p className="text-sm">
                            {todo.deadLine.toString().slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="max-w-[170px]">
                          <Select
                            value={todo.status}
                            onValueChange={async (value) => {
                              setSelectedTodo(todo, props);
                              setStatus(value);
                              await handleEdit();
                            }}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {statuses.map((status) => (
                                <SelectItem
                                  className="tex-xs"
                                  key={status.value}
                                  value={status.value}
                                >
                                  <div className="flex flex-row items-center gap-2">
                                    <status.icon className="h-5 w-5" />{" "}
                                    {status.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-row gap-2">
                          <div
                            onClick={() => {
                              selectedTodoId !== todo.rowguid
                                ? setSelectedTodo(todo, props)
                                : null;
                            }}
                          >
                            <EditDialog props={props} todo={todo} />
                          </div>

                          <DeleteDialog
                            title={todo.title}
                            handleDelete={() => {
                              todo.status !== todoStatus.todo
                                ? showToast(
                                    "Action not allowed",
                                    "You can't delete ongoing  or completed tasks"
                                  )
                                : handleDelete(todo.rowguid);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Toaster />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3"></CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Todos;
