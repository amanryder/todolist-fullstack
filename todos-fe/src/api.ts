import axios from "axios";

export const fetchTodos = async (token: string, search: string) => {
  const response = await axios.get(
    "http://localhost:3000/todos" + (search !== "" ? `/?q=${search}` : ""),
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addTodo = async (
  token: string,
  title: string,
  description: string,
  status: string,
  deadLine: Date
) => {
  const response = await axios.post(
    "http://localhost:3000/todos",
    {
      title,
      description,
      status: status,
      deadLine: deadLine,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const editTodo = async (
  token: string,
  title: string,
  description: string,
  status: string,
  deadLine: Date,
  selectedTodoId: string
) => {
  const response = await axios.patch(
    "http://localhost:3000/todos/" + selectedTodoId,
    {
      title,
      description,
      status: status,
      deadLine: deadLine,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteToDo = async (token: string, uuid: string) => {
  const response = await axios.delete("http://localhost:3000/todos/" + uuid, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
};
